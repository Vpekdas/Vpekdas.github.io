import { OFFSET_X, OFFSET_Y, SCALE_FACTOR } from "../constants/GameConstants.js";

export function getIndicatorOffset (boundary, indicatorScale, offset) {
	const	topLeft = indicatorScale[0];
	const	topRight = indicatorScale[1];
	const	bottomLeft = indicatorScale[2];
	const	bottomRight = indicatorScale[3];
	return ([
		{ dx: -offset * topLeft.x, dy: -offset * topLeft.y, direction: "top_left" },
		{ dx: -offset * bottomLeft.x, dy: boundary.height - offset * bottomLeft.y, direction: "bot_left" },
		{ dx: boundary.width - offset * topRight.x, dy: -offset * topRight.y, direction: "top_right" },
		{ dx: boundary.width - offset * bottomRight.x, dy: boundary.height - offset * bottomRight.y, direction: "bot_right" }
	  ]);
};

export function createIndicator(x, y, animation, k) {
    const indicator = k.add([
        k.sprite("indicator"),
        k.pos((x + OFFSET_X) * SCALE_FACTOR, (y + OFFSET_Y) * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
    ]);
    indicator.play(animation);
};
