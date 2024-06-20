import { OFFSET_X, OFFSET_Y, SCALE_FACTOR } from "../constants/GameConstants.js";

export function createTile(k, tiles, frame, x, y) {
	const originalSprite = k.add([
	  k.sprite(tiles, { frame }),
	  k.pos(x * SCALE_FACTOR, y * SCALE_FACTOR),
	  k.scale(SCALE_FACTOR),
	]);

	return originalSprite;
};

export function createInteractable(k, tiles ,boundary, frame, modifX, modifY) {
	const originalSprite = k.add([
	  k.sprite(tiles, { frame }),
	  k.pos((boundary.x + OFFSET_X + modifX) * SCALE_FACTOR, (boundary.y + OFFSET_Y + modifY) * SCALE_FACTOR),
	  k.scale(SCALE_FACTOR),
	]);
	const blinkSprite = k.add([
	  k.sprite(tiles, { frame }),
	  k.pos((boundary.x + OFFSET_X + modifX) * SCALE_FACTOR, (boundary.y + OFFSET_Y + modifY) * SCALE_FACTOR),
	  k.color(255, 255, 255),
	  k.opacity(0.75),
	  k.scale(SCALE_FACTOR),
	]);
  
	return {
	  originalSprite,
	  blinkSprite,
	  blink: false,
	};
};
