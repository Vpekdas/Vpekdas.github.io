import type { GameObj, KAPLAYCtx, Vec2 } from "kaplay";
import { PLAYER_SPEED } from "./constants";

const keysPressed: Record<string, boolean> = {
    w: false,
    a: false,
    s: false,
    d: false,

    z: false,
    q: false,

    up: false,
    down: false,
    left: false,
    right: false,

    mouse: false,
};

function playAnimation(key: string, player: GameObj): void {
    if (key === "w" || key === "z" || key === "up") {
        player.play("idle-up");
    } else if (key === "s" || key === "down") {
        player.play("idle-down");
    } else {
        player.play("idle-side");
    }
}

function registerKeyEvents(key: string, keysPressed: Record<string, boolean>, k: KAPLAYCtx, player: GameObj): void {
    k.onKeyDown(key, () => {
        keysPressed[key] = true;
    });

    k.onKeyRelease(key, () => {
        keysPressed[key] = false;
        playAnimation(key, player);
    });
}

export function handleKeyPressed(k: KAPLAYCtx, player: any) {
    Object.keys(keysPressed).forEach((key) => registerKeyEvents(key, keysPressed, k, player));
}

/**
 * Moves the player based on key input.
 * @param {GameObj} player The player game object.
 * @returns {void}
 */
export function movePlayer(player: GameObj): void {
    if (keysPressed["mouse"]) {
        return;
    }
    // Dividing by 4 prevents increased speed when moving diagonally.
    if ((keysPressed.w || keysPressed.up || keysPressed.z) && (keysPressed.a || keysPressed.left || keysPressed.q)) {
        player.move(-PLAYER_SPEED / 4, -PLAYER_SPEED / 4);
        if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
            player.play("walk-up");
            player.direction = "up";
        }
    } else if ((keysPressed.w || keysPressed.up || keysPressed.z) && (keysPressed.d || keysPressed.right)) {
        player.move(+PLAYER_SPEED / 4, -PLAYER_SPEED / 4);
        if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
            player.play("walk-up");
            player.direction = "up";
        }
    } else if (keysPressed.w || keysPressed.up || keysPressed.z) {
        player.move(0, -PLAYER_SPEED);
        if (player.curAnim() !== "walk-up") {
            player.play("walk-up");
            player.direction = "up";
        }
    }

    if ((keysPressed.s || keysPressed.down) && (keysPressed.left || keysPressed.a || keysPressed.q)) {
        player.move(-PLAYER_SPEED / 4, PLAYER_SPEED / 4);
        if (player.curAnim() !== "walk-down" && player.curAnim() !== "walk-side") {
            player.play("walk-down");
            player.direction = "down";
        }
    } else if ((keysPressed.s || keysPressed.down) && (keysPressed.right || keysPressed.d)) {
        player.move(PLAYER_SPEED / 4, PLAYER_SPEED / 4);
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

    if (keysPressed.a || keysPressed.left || keysPressed.q) {
        player.move(-PLAYER_SPEED, 0);
        if (player.curAnim() !== "walk-side" || player.direction !== "left") {
            player.flipX = true;
            player.play("walk-side");
            player.direction = "left";
        }
    }
}

/**
 * Moves the player based on where the mouse has been clicked.
 * @param {GameObj} player The player game object.
 * @param {Vec2} worldMousepos The x and y coordinates in world space.
 * @returns {void}
 */
function movePlayerTo(player: GameObj, worldMousepos: Vec2): void {
    player.moveTo(worldMousepos, PLAYER_SPEED);
}

/**
 * Updates the animation when clicked with the mouse.
 * @param {GameObj} player The player game object.
 * @param {Vec2} worldMousepos The x and y coordinates in world space.
 * @returns {void}
 */
function updatePlayerAnimation(player: GameObj, worldMousepos: Vec2): void {
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

function onMousePressed(k: KAPLAYCtx, player: GameObj): void {
    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== "left") {
            return;
        }

        const worldMousepos = k.toWorld(k.mousePos());
        movePlayerTo(player, worldMousepos);
        updatePlayerAnimation(player, worldMousepos);
        keysPressed["mouse"] = true;
    });
}

function onMouseReleased(k: KAPLAYCtx, player: GameObj): void {
    k.onMouseRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
        } else if (player.direction === "up") {
            player.play("idle-up");
        } else {
            player.play("idle-side");
        }
        keysPressed["mouse"] = false;
    });
}

/**
 * Handles all events related to mouse actions, including press and release.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {GameObj} player The player game object.
 * @returns {void}
 */
export function handleMouseEvents(k: KAPLAYCtx, player: GameObj): void {
    onMousePressed(k, player);
    onMouseReleased(k, player);
}
