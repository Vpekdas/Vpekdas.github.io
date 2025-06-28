import { SCALE_FACTOR, PLAYER_SPEED } from "./constants";
import type { GameObj, KAPLAYCtx } from "kaplay";

/**
 * Creates a player and returns its game object.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @returns {GameObj} The created player game object.
 */
export function createPlayer(k: KAPLAYCtx): GameObj {
    const player = k.add([
        k.sprite("player", { anim: "idle-down" }),
        k.area({
            shape: new k.Rect(k.vec2(0, 3), 10, 16),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.z(1),
        k.scale(SCALE_FACTOR),
        {
            speed: PLAYER_SPEED,
            direction: "down",
            prevPosX: 0,
            prevPosY: 0,
        },
        "player",
    ]);
    return player;
}
