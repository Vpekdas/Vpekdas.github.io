import type { GameObj, KAPLAYCtx } from "kaplay";
import { OFFSET_X, OFFSET_Y, SCALE_FACTOR } from "./constants";

/**
 * Represents offset indicators for positioning elements.
 */
export interface IndicatorOffset {
    /**
     * Horizontal offset value.
     */
    dx: number;
    /**
     * Vertical offset value.
     */
    dy: number;
    /**
     * The direction or corner where the indicator is positioned.
     */
    direction: "top_left" | "bot_left" | "top_right" | "bot_right";
}

/**
 * Returns the offset to place well indicators.
 * @param {{ width: number, height: number }} boundary The width and height of the element to add indicators to.
 * @param {number} indicatorScale The scale of the indicator.
 * @param {number} offset The offset of the indicator.
 * @returns {IndicatorOffset[]} An array of indicator offset objects.
 */
export function getIndicatorOffset(
    boundary: { width: number; height: number },
    indicatorScale: { x: number; y: number }[],
    offset: number
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

/**
 * Returns a created indicator.
 * @param {number} x The x coordinate at which to place the indicator.
 * @param {number} y The y coordinate at which to place the indicator.
 * @param {any} animation The animation to play for the indicator.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @returns {GameObj} The created indicator object.
 */
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

/**
 * Returns a created interactable object.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {string} tiles The name of the loaded tiles.
 * @param {any} boundary The boundary object or name found in the JSON.
 * @param {number} frame The frame number to use from the spritesheet.
 * @param {number} modifX The X offset position.
 * @param {number} modifY The Y offset position.
 * @returns {Interactable} The created interactable object.
 */
export function createInteractable(
    k: KAPLAYCtx,
    tiles: string,
    boundary: any,
    frame: number,
    modifX: number,
    modifY: number
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

/**
 * Returns a created GameObj or Interactable object.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {string} tiles The name of the loaded tiles.
 * @param {number} frame The frame number to use from the spritesheet.
 * @param {number} x The X position.
 * @param {number} y The Y position.
 * @param {number} z The Z position.
 * @returns {GameObj} The created game object.
 */
export function createTile(k: KAPLAYCtx, tiles: string, frame: number, x: number, y: number, z: number): GameObj {
    const sprite = k.add([
        k.sprite(tiles, { frame }),
        k.pos(x * SCALE_FACTOR, y * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
        k.z(z),
    ]);

    return sprite;
}
