import { closeDialogue } from "./utils";
import { PLAYER_SPEED } from "./constants";

function movePlayer(player, worldMousepos) {
    player.moveTo(worldMousepos, PLAYER_SPEED);
}

function updatePlayerAnimation(player, worldMousepos) {
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

function onMousePressed(k, player) {
    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== "left" || player.isInDialogue) {
            return;
        }
        if (k.isMousePressed(mouseBtn) && player.isInDialogue) {
            player.isInDialogue = false;
            closeDialogue();
        }
        const worldMousepos = k.toWorld(k.mousePos());
        movePlayer(player, worldMousepos);
        updatePlayerAnimation(player, worldMousepos);
    });
}

function onMouseReleased(k, player) {
    k.onMouseRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }
        player.play("idle-side");
    });
}

export function handleMouseEvents(k, player) {
    onMousePressed(k, player);
    onMouseReleased(k, player);
}
