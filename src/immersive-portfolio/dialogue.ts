import type { GameObj, KAPLAYCtx } from "kaplay";
import { SCALE_FACTOR } from "./constants";

export interface Dialogue {
    box: GameObj;
    text: GameObj;
}

export function createDialogueBox(k: KAPLAYCtx): Dialogue {
    const dialogueBox = k.add([
        k.pos(0, k.height() - k.height() / 2.5),
        k.rect(k.width() / 2, k.height() / 6),
        k.outline(4),
        k.fixed(),
        k.scale(SCALE_FACTOR),
        k.z(10),
    ]);

    const dialogueText = dialogueBox.add([
        k.text("", { size: 24 }),
        k.pos(16, 16),
        k.color(k.BLACK),
        k.fixed(),
        k.z(11),
    ]);

    const dialogue: Dialogue = {
        box: dialogueBox,
        text: dialogueText,
    };

    closeDialogue(dialogue.box);

    return dialogue;
}

export function showDialogue(dialogueBox: GameObj) {
    if (dialogueBox.exists()) {
        dialogueBox.hidden = false;
    }
}

export function closeDialogue(dialogueBox: GameObj) {
    if (dialogueBox.exists()) {
        dialogueBox.hidden = true;
    }
}

export function modifyDialogue(k: KAPLAYCtx, dialogue: Dialogue, newText: string) {
    dialogue.text.text = "";
    let displayedText = "";
    let charIndex = 0;

    showDialogue(dialogue.box);

    k.loop(0.05, () => {
        if (charIndex < newText.length) {
            displayedText += newText[charIndex];
            dialogue.text.text = displayedText;
            charIndex++;
        }
    });
}
