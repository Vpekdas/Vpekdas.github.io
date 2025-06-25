import type { KAPLAYCtx } from "kaplay";
import { ensureCanvasFocus } from "./utils";
import { PLAYER_SPEED } from "./constants";
import { closeDialogue } from "./dialogue";

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

export function handleInput() {
    window.addEventListener("keydown", (event) => {
        handleStart(event);
    });
}

function handleStart(event: any) {
    if (event.key === " ") {
        const background = document.querySelector("#background") as HTMLElement | null;
        if (background) {
            toggleDisplay(background, "none");
            ensureCanvasFocus();
        }
    }
}

function toggleDisplay(element: HTMLElement, displayStyle: string) {
    element.style.display = displayStyle;
}

export function handleKeyPressed(k: KAPLAYCtx, player: any) {
    Object.keys(keysPressed).forEach((key) => handleKeyEvents(key, true, keysPressed, k, player));
}

function handleKeyEvents(key: any, isPressed: boolean, keysPressed: any, k: KAPLAYCtx, player: any) {
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
                const dialogueUI = document.getElementById("textbox-container") as HTMLElement | null;
                const dialogue = document.getElementById("dialogue") as HTMLElement | null;

                if (dialogueUI && dialogue) {
                    dialogueUI.style.display = "none";
                    dialogue.innerHTML = "";
                    player.isInDialogue = false;
                }
            }
        }
    });
}

export function movePlayer(player: any) {
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

function movePlayerTo(player: any, worldMousepos: any) {
    player.moveTo(worldMousepos, PLAYER_SPEED);
}

function updatePlayerAnimation(player: any, worldMousepos: any) {
    const mouseAngle = player.pos.angle(worldMousepos);
    const lowerBound = 50;
    const upperBound = 125;

    if (mouseAngle > lowerBound && mouseAngle < upperBound && player.curAnim() !== "walk-up") {
        player.play("walk-up");
        player.direction = "up";
    }
    if (mouseAngle < -lowerBound && mouseAngle > -upperBound && player.curAnim() !== "walk-down") {
        player.play("walk-down");
        player.direction = "down";
    }
    if (Math.abs(mouseAngle) < lowerBound) {
        player.flipX = true;
        if (player.curAnim() !== "walk-side") {
            player.play("walk-side");
            player.direction = "left";
        }
    }
    if (Math.abs(mouseAngle) > upperBound) {
        player.flipX = false;
        if (player.curAnim() !== "walk-side") {
            player.play("walk-side");
            player.direction = "right";
        }
    }
}

function onMousePressed(k: KAPLAYCtx, player: any) {
    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== "left" || player.isInDialogue) {
            return;
        }
        if (k.isMousePressed(mouseBtn) && player.isInDialogue) {
            player.isInDialogue = false;
            closeDialogue();
        }
        const worldMousepos = k.toWorld(k.mousePos());
        movePlayerTo(player, worldMousepos);
        updatePlayerAnimation(player, worldMousepos);
    });
}

function onMouseReleased(k: KAPLAYCtx, player: any) {
    k.onMouseRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
        } else if (player.direction === "up") {
            player.play("idle-up");
        } else {
            player.play("idle-side");
        }
    });
}

export function handleMouseEvents(k: KAPLAYCtx, player: any) {
    onMousePressed(k, player);
    onMouseReleased(k, player);
}
