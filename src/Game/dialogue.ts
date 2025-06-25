import { ensureCanvasFocus } from "./utils.ts";

export function displayDialogue(text: string, onDisplayEnd: () => void): void {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    const closeBtn = document.getElementById("close");

    if (!dialogueUI || !dialogue || !closeBtn) {
        console.error("Required DOM elements are missing");
        return;
    }

    dialogueUI.style.display = "block";

    let index = 0;
    let currentText = "";
    const intervalRef = window.setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }
        clearInterval(intervalRef);
    }, 5);

    function onCloseClick() {
        onDisplayEnd();
        dialogueUI!.style.display = "none";
        dialogue!.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn!.removeEventListener("click", onCloseClick);
        ensureCanvasFocus();
    }

    closeBtn.addEventListener("click", onCloseClick);
}

export function closeDialogue(): void {
    const dialogueUI = document.getElementById("textbox-container");
    if (dialogueUI) {
        dialogueUI.style.display = "none";
    }
}
