import { PLAYER_SPEED } from "./constants.js";
import { ensureCanvasFocus } from "./utils.js";

const NOTE_SELECTOR = ".note";
const DIVERGENCE_METER_SELECTOR = ".glitch-wrapper";
const HEXAGON_MENU_SELECTOR = "#hexagon-menu";
const RESET_BUTTON_SELECTOR = ".clear-storage-button";
const D_MAIL_INTERFACE_SELECTOR = "#d-mail-interface";
const COMPLETING_MODAL_OVERLAY_SELECTOR = ".completing-modal-overlay";
const BACKGROUND_SELECTOR = "#background";

const keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
};

function handleKeyEvents(key, isPressed, keysPressed, k, player) {
    k.onKeyDown(key, () => {
        keysPressed[key] = isPressed;
    });

    k.onKeyRelease(key, () => {
        keysPressed[key] = !isPressed;
        if (key === "w" || key === "up") {
            player.play("idle-up");
            return;
        } else if (key === "s" || key === "down") {
            player.play("idle-down");
            return;
        } else if (key == "a" || key == "left" || key == "d" || key == "right") {
            player.play("idle-side");
        } else if (key == "space") {
            if (player.isInDialogue) {
                const dialogueUI = document.getElementById("textbox-container");
                const dialogue = document.getElementById("dialogue");

                dialogueUI.style.display = "none";
                dialogue.innerHTML = "";
                player.isInDialogue = false;
            }
        }
    });
}

export function handleKeyPressed(k, player) {
    Object.keys(keysPressed).forEach((key) => handleKeyEvents(key, true, keysPressed, k, player));
}

export function movePlayer(player) {
    if (!player.isInDialogue) {
        if ((keysPressed.w && keysPressed.a) || (keysPressed.up && keysPressed.left)) {
            player.move(-PLAYER_SPEED / Math.sqrt(2), -PLAYER_SPEED / Math.sqrt(2));
            if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
                player.play("walk-up");
                player.direction = "up";
            }
        } else if ((keysPressed.w && keysPressed.d) || (keysPressed.up && keysPressed.right)) {
            player.move(+PLAYER_SPEED / Math.sqrt(2), -PLAYER_SPEED / Math.sqrt(2));
            if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
                player.play("walk-up");
                player.direction = "up";
            }
        } else if (keysPressed.w || keysPressed.up) {
            player.move(0, -PLAYER_SPEED);
            if (player.curAnim() !== "walk-up") {
                player.play("walk-up");
                player.direction = "up";
            }
        }

        if ((keysPressed.s && keysPressed.a) || (keysPressed.down && keysPressed.left)) {
            player.move(-PLAYER_SPEED / Math.sqrt(2), +PLAYER_SPEED / Math.sqrt(2));
            if (player.curAnim() !== "walk-down" && player.curAnim() !== "walk-side") {
                player.play("walk-down");
                player.direction = "down";
            }
        } else if ((keysPressed.s && keysPressed.d) || (keysPressed.down && keysPressed.right)) {
            player.move(+PLAYER_SPEED / Math.sqrt(2), +PLAYER_SPEED / Math.sqrt(2));
            if (player.curAnim() !== "walk-down" && player.curAnim() !== "walk-side") {
                player.play("walk-down");
                player.direction = "down";
            }
        } else if (keysPressed.s || keysPressed.down) {
            player.move(0, PLAYER_SPEED);
            if (player.curAnim() !== "walk-down") {
                player.play("walk-down");
                player.direction = "down";
            }
        }

        if (keysPressed.d || keysPressed.right) {
            player.move(PLAYER_SPEED, 0);
            if (player.curAnim() !== "walk-side" || player.direction !== "right") {
                player.flipX = false;
                player.play("walk-side");
                player.direction = "right";
            }
        }

        if (keysPressed.a || keysPressed.left) {
            player.move(-PLAYER_SPEED, 0);
            if (player.curAnim() !== "walk-side" || player.direction !== "left") {
                player.flipX = true;
                player.play("walk-side");
                player.direction = "left";
            }
        }
    }
}

function toggleDisplay(element, displayStyle) {
    element.style.display = displayStyle;
}

function handleNoteToggle(event) {
    const note = document.querySelector(NOTE_SELECTOR);
    const divergenceMeter = document.querySelector(DIVERGENCE_METER_SELECTOR);

    if (event.key === "c") {
        toggleDisplay(note, "none");
        if (divergenceMeter.style.display === "none") {
            toggleDisplay(divergenceMeter, "flex");
        }
    } else if (event.key === "h") {
        toggleDisplay(note, "block");
        toggleDisplay(divergenceMeter, "none");
    }
}

function handleHexagonMenuToggle(event) {
    const menu = document.querySelector(HEXAGON_MENU_SELECTOR);
    const resetButton = document.querySelector(RESET_BUTTON_SELECTOR);

    if (event.key === "m") {
        toggleDisplay(menu, "flex");
        toggleDisplay(resetButton, "inline-flex");
    } else if (event.key === "e") {
        toggleDisplay(menu, "none");
        toggleDisplay(resetButton, "none");
    }
}

function handleEscapeKey(event, player) {
    const dMailInterface = document.querySelector(D_MAIL_INTERFACE_SELECTOR);
    const completingModalOverlay = document.querySelector(COMPLETING_MODAL_OVERLAY_SELECTOR);

    if (event.key === "Escape") {
        if (dMailInterface.style.display === "flex") {
            toggleDisplay(dMailInterface, "none");
            player.isInDialogue = false;
            ensureCanvasFocus();
        }
        if (completingModalOverlay.style.display === "flex") {
            toggleDisplay(completingModalOverlay, "none");
            player.isInDialogue = false;
            ensureCanvasFocus();
        }
    }
}

function handleStart(event) {
    if (event.key === " ") {
        const background = document.querySelector(BACKGROUND_SELECTOR);
        toggleDisplay(background, "none");
        ensureCanvasFocus();
    }
}

export function handleUIEvent(player) {
    window.addEventListener("keydown", (event) => {
        handleNoteToggle(event);
        handleHexagonMenuToggle(event);
        handleEscapeKey(event, player);
        handleStart(event);
    });
}
