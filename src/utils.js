export function displayDialogue(text, onDisplayEnd) {
	const dialogueUI = document.getElementById("textbox-container");
	const dialogue = document.getElementById("dialogue");

	dialogueUI.style.display = "block";

	let index = 0;
	let currentText = "";
	const intervalRef = setInterval(() => {
		if (index < text.length) {
			currentText += text[index];
			dialogue.innerHTML = currentText;
			index++;
			return;
		}
		clearInterval(intervalRef);
	}, 5);

	const closeBtn = document.getElementById("close");
	function onCloseClick() {
		onDisplayEnd();
		dialogueUI.style.display = "none";
		dialogue.innerHTML = "";
		clearInterval(intervalRef);
		closeBtn.removeEventListener("click", onCloseClick);
	}

	closeBtn.addEventListener("close", onCloseClick);
}