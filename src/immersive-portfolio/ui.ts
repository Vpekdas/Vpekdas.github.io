import type { KAPLAYCtx } from "kaplay";

export function blinkInteractiveElements(k: KAPLAYCtx, interactiveElements: any) {
    for (const element of interactiveElements) {
        element.blink = Math.floor(k.time() / 0.5) % 2 === 0;

        if (element.blink) {
            element.sprite.opacity = 0.75;
        } else {
            element.sprite.opacity = 1;
        }
    }
}

export interface HoverProps {
    name: string;
    bubbleX: number;
    bubbleY: number;
    bubbleScale: number;
    textSize: number;
    textWidth: number;
    textX: number;
    textY: number;
    sprite?: string;
    font?: string;
}

export function generateHoverEvents(k: KAPLAYCtx, props: HoverProps) {
    let {
        name,
        bubbleX,
        bubbleY,
        bubbleScale,
        textSize,
        textWidth,
        textX,
        textY,
        sprite = "hover",
        font = "myFont",
    } = props;
    let bubble: any = null;
    let bubbleText: any = null;

    k.onHover(name, () => {
        if (!bubble) {
            bubble = k.add([k.sprite(sprite), k.pos(bubbleX, bubbleY), k.scale(bubbleScale)]);

            bubbleText = k.add([
                k.text(name, {
                    size: textSize,
                    width: textWidth,
                    font: font,
                }),
                k.pos(textX, textY),
            ]);
        }
    });

    k.onHoverEnd(name, () => {
        if (bubble) {
            k.destroy(bubble);
            bubble = null;
        }

        if (bubbleText) {
            k.destroy(bubbleText);
            bubbleText = null;
        }
    });
}
