import type { GameObj, KAPLAYCtx } from "kaplay";
import { FONT_SIZE, SCALE_FACTOR } from "./constants";

export interface Dialogue {
    box: GameObj;
    text: GameObj;
    button: GameObj;
    buttonText: GameObj;
}

export function createDialogueBox(k: KAPLAYCtx): Dialogue {
    const dialogueBox = k.add([
        k.pos(0, k.height() - k.height() / 2.5),
        k.rect(k.width() / 2, k.height() / 6),
        k.outline(4),
        k.fixed(),
        k.scale(SCALE_FACTOR),
        k.z(10),
        "dialogueBox",
    ]);

    const dialogueText = dialogueBox.add([
        k.text("", { size: 14, lineSpacing: 8 }),
        k.pos(16, 16),
        k.color(k.BLACK),
        k.fixed(),
        k.z(11),
        "dialogueText",
    ]);

    const button = dialogueBox.add([
        k.pos(dialogueBox.width - 100, dialogueBox.height),
        k.rect(50, 14),
        k.outline(1),
        k.fixed(),
        k.scale(SCALE_FACTOR),
        k.z(11),
        k.color(k.RED),
        k.area(),
        "button",
    ]);

    const buttonText = button.add([
        k.text("Github", { size: 11 }),
        k.pos(6, 3),
        k.color(k.BLACK),
        k.fixed(),
        k.z(11),
        "buttonText",
    ]);

    const dialogue: Dialogue = {
        box: dialogueBox,
        text: dialogueText,
        button: button,
        buttonText: buttonText,
    };

    closeDialogue(dialogue.box);

    return dialogue;
}

export function showDialogue(dialogueBox: GameObj): void {
    if (dialogueBox.exists()) {
        dialogueBox.hidden = false;
    }
}

export function closeDialogue(dialogueBox: GameObj): void {
    if (dialogueBox.exists()) {
        dialogueBox.hidden = true;
    }
}

export function handleDialogue(k: KAPLAYCtx, dialogue: Dialogue, newText: string, url: string, boundary: string): void {
    dialogue.text.text = "";
    let displayedText = "";
    let charIndex = 0;

    const boxWidth = k.width() / 2;
    const avgCharWidth = FONT_SIZE * 0.6;
    const maxCharsPerLine = Math.floor((boxWidth - 32) / avgCharWidth);

    const wrappedText = wrapText(newText, maxCharsPerLine);

    showDialogue(dialogue.box);

    // Runs the animation to display the text word by word.
    const textLoop = k.loop(0.05, () => {
        if (charIndex < wrappedText.length) {
            displayedText += wrappedText[charIndex];
            dialogue.text.text = displayedText;
            charIndex++;
        } else {
            textLoop.cancel();
        }
    });

    // Ensure that the animation stops when exiting. Otherwise, the loop will continue, and the next time you collide, the animation will play multiple times.
    k.onCollideEnd("player", boundary, () => {
        textLoop.cancel();
    });

    k.onHover("button", (button) => {
        button.color = k.CYAN;
    });

    k.onHoverEnd("button", (button) => {
        button.color = k.RED;
    });

    // Redirect when the button is clicked.
    k.onClick("button", () => {
        window.open(url, "_blank", "noopener noreferrer");
    });
}

function wrapText(str: string, maxChars: number): string {
    const words = str.split(" ");
    let lines = [];
    let currentLine = "";

    for (const word of words) {
        if ((currentLine + word).length > maxChars) {
            lines.push(currentLine.trim());
            currentLine = "";
        }
        currentLine += word + " ";
    }
    lines.push(currentLine.trim());
    return lines.join("\n");
}
