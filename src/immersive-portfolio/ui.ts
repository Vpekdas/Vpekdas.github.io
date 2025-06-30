import type { KAPLAYCtx } from "kaplay";
import { OFFSET_X, SCALE_FACTOR } from "./constants";
import type { Interactable } from "./elementFactory";

/**
 * Contains all properties for hovering elements.
 */
export interface HoverProps {
    /**
     * Text that will be written.
     */
    name: string;
    /**
     * X position of the bubble.
     */
    bubbleX: number;
    /**
     * Y position of the bubble.
     */
    bubbleY: number;
    /**
     * Scale of the bubble.
     */
    bubbleScale: number;
    /**
     * Size of the text.
     */
    textSize: number;
    /**
     * Width of the text before wrapping.
     */
    textWidth: number;
    /**
     * Optional sprite for the bubble.
     */
    sprite?: string;
    /**
     * Sprite for the bubble.
     */
    bubbleSprite?: string;
    /**
     * Font for the text.
     */
    font?: string;
}

/**
 * Handles the blinking effect for interactive elements.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {Interactable[]} interactiveElements List of all interactive elements.
 * @returns {void}
 */
export function blinkInteractiveElements(k: KAPLAYCtx, interactiveElements: Interactable[]): void {
    for (const element of interactiveElements) {
        element.blink = Math.floor(k.time() / 0.5) % 2 === 0;

        if (element.blink) {
            element.sprite.opacity = 0.75;
        } else {
            element.sprite.opacity = 1;
        }
    }
}

/**
 * Handles all hover events, from creation when hovered to destruction when hover ends.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {HoverProps} props Properties of a hovering element.
 * @returns {void}
 */
export function generateHoverEvents(k: KAPLAYCtx, props: HoverProps): void {
    let { name, bubbleX, bubbleY, bubbleScale, textSize, textWidth, sprite = "hover", font = "myFont" } = props;
    let bubble: any = null;
    let bubbleText: any = null;
    let bubbleOpacity = 0;
    let fadingOut = false;
    const maxOpacity = 1;
    const fadeSpeed = 0.05;

    k.onHover(name, () => {
        if (!bubble) {
            bubble = k.add([
                k.sprite(sprite),
                k.pos(bubbleX, bubbleY),
                k.scale(bubbleScale),
                k.anchor("center"),
                k.opacity(0),
            ]);
            bubbleOpacity = 0;
            fadingOut = false;
            bubbleText = bubble.add([
                k.text(name, {
                    size: textSize,
                    width: textWidth,
                    font: font,
                }),
                k.pos(OFFSET_X * SCALE_FACTOR, 0),
                k.anchor("center"),
                k.opacity(0),
            ]);
        }
    });

    k.onUpdate(name, () => {
        if (bubble) {
            if (fadingOut) {
                bubble.opacity = Math.max(0, bubble.opacity - fadeSpeed);
                bubbleText.opacity = Math.max(0, bubble.opacity - fadeSpeed);

                if (bubble.opacity === 0) {
                    k.destroy(bubble);
                    bubble = null;
                    fadingOut = false;
                }
            } else if (bubble.opacity < maxOpacity) {
                bubble.opacity = Math.min(maxOpacity, bubble.opacity + fadeSpeed);
                bubbleText.opacity = Math.min(maxOpacity, bubble.opacity + fadeSpeed);
            }
        }
    });

    k.onHoverEnd(name, () => {
        fadingOut = true;
    });
}
