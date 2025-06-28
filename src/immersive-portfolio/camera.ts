import type { KAPLAYCtx } from "kaplay";

export function setCamScale(k: KAPLAYCtx) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.setCamScale(k.vec2(1));
        return;
    }

    k.setCamScale(k.vec2(1.5));
}
