import type { GameObj, KAPLAYCtx } from "kaplay";
import { OFFSET_X, OFFSET_Y, SCALE_FACTOR } from "./constants";

export interface IndicatorOffset {
    dx: number;
    dy: number;
    direction: "top_left" | "bot_left" | "top_right" | "bot_right";
}

export function getIndicatorOffset(
    boundary: { width: number; height: number },
    indicatorScale: { x: number; y: number }[],
    offset: number,
): IndicatorOffset[] {
    const topLeft = indicatorScale[0];
    const topRight = indicatorScale[1];
    const bottomLeft = indicatorScale[2];
    const bottomRight = indicatorScale[3];

    return [
        {
            dx: -offset * topLeft.x,
            dy: -offset * topLeft.y,
            direction: "top_left",
        },
        {
            dx: -offset * bottomLeft.x,
            dy: boundary.height - offset * bottomLeft.y,
            direction: "bot_left",
        },
        {
            dx: boundary.width - offset * topRight.x,
            dy: -offset * topRight.y,
            direction: "top_right",
        },
        {
            dx: boundary.width - offset * bottomRight.x,
            dy: boundary.height - offset * bottomRight.y,
            direction: "bot_right",
        },
    ];
}

export function createIndicator(x: number, y: number, animation: any, k: KAPLAYCtx): GameObj {
    const indicator = k.add([
        k.sprite("indicator"),
        k.pos((x + OFFSET_X) * SCALE_FACTOR, (y + OFFSET_Y) * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
    ]);
    indicator.play(animation);
    return indicator;
}

export interface Interactable {
    name: string;
    sprite: GameObj;
    blink: boolean;
}

export function createInteractable(
    k: KAPLAYCtx,
    tiles: string,
    boundary: any,
    frame: number,
    modifX: number,
    modifY: number,
): Interactable {
    const sprite = k.add([
        k.sprite(tiles, { frame }),
        k.pos((boundary.x + OFFSET_X + modifX) * SCALE_FACTOR, (boundary.y + OFFSET_Y + modifY) * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
    ]);

    const name = boundary.name;

    const Interactable = {
        name: name,
        sprite: sprite,
        blink: false,
    };

    return Interactable;
}

export function createTile(k: KAPLAYCtx, tiles: string, frame: number, x: number, y: number, z: number): GameObj {
    const sprite = k.add([
        k.sprite(tiles, { frame }),
        k.pos(x * SCALE_FACTOR, y * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
        k.z(z),
    ]);

    return sprite;
}
