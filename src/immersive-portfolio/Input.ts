import type { GameObj, KAPLAYCtx } from "kaplay";
import { PLAYER_SPEED } from "./constants";

const keysPressed: Record<string, boolean> = {
    w: false,
    a: false,
    s: false,
    d: false,
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    mouse: false,
};

function stopKeyAnimation(key: string, player: GameObj) {
    if (key === "w" || key === "up") {
        player.play("idle-up");
    } else if (key === "s" || key === "down") {
        player.play("idle-down");
    } else {
        player.play("idle-side");
    }
}

function registerKeyEvents(key: any, keysPressed: any, k: KAPLAYCtx, player: GameObj) {
    k.onKeyDown(key, () => {
        keysPressed[key] = true;
    });

    k.onKeyRelease(key, () => {
        keysPressed[key] = false;
        stopKeyAnimation(key, player);
    });
}

export function handleKeyPressed(k: KAPLAYCtx, player: any) {
    Object.keys(keysPressed).forEach((key) => registerKeyEvents(key, keysPressed, k, player));
}

export function movePlayer(player: GameObj) {
    if (keysPressed["mouse"]) {
        return;
    }
    if ((keysPressed.w && keysPressed.a) || (keysPressed.up && keysPressed.left)) {
        player.move(-PLAYER_SPEED / 4, -PLAYER_SPEED / 4);
        if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
            player.play("walk-up");
            player.direction = "up";
        }
    } else if ((keysPressed.w && keysPressed.d) || (keysPressed.up && keysPressed.right)) {
        player.move(+PLAYER_SPEED / 4, -PLAYER_SPEED / 4);
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
        player.move(-PLAYER_SPEED / 4, PLAYER_SPEED / 4);
        if (player.curAnim() !== "walk-down" && player.curAnim() !== "walk-side") {
            player.play("walk-down");
            player.direction = "down";
        }
    } else if ((keysPressed.s && keysPressed.d) || (keysPressed.down && keysPressed.right)) {
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

    if (keysPressed.a || keysPressed.left) {
        player.move(-PLAYER_SPEED, 0);
        if (player.curAnim() !== "walk-side" || player.direction !== "left") {
            player.flipX = true;
            player.play("walk-side");
            player.direction = "left";
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
        if (mouseBtn !== "left") {
            return;
        }

        const worldMousepos = k.toWorld(k.mousePos());
        movePlayerTo(player, worldMousepos);
        updatePlayerAnimation(player, worldMousepos);
        keysPressed["mouse"] = true;
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
        keysPressed["mouse"] = false;
    });
}

export function handleMouseEvents(k: KAPLAYCtx, player: any) {
    onMousePressed(k, player);
    onMouseReleased(k, player);
}
