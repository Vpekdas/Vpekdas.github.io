import { SCALE_FACTOR } from "../constants/GameConstants.js"

export function createBackground(k, backgroundNumber, spriteName) {

	const	backgroundArray = [];
	const	tempSprite = k.add([k.sprite(spriteName)]);
	const	spriteWidth = tempSprite.width;

	for (let i = 0; i < backgroundNumber; i++) {
		backgroundArray.push(k.add ([
			k.sprite(spriteName),
			k.pos(i * spriteWidth - k.width(), 0),
			k.scale(SCALE_FACTOR),
		]));
	}
	destroy(tempSprite);
	return backgroundArray;
};

export function updateBackground (k, backgroundLayer, speed, backgroundCamY, playerX) {
	for (let i = 0; i < backgroundLayer.length; i++) {
		if (speed === 0) {
			backgroundLayer[i].pos.x -= SCALE_FACTOR;
			if (backgroundLayer[i].pos.x <= i * backgroundLayer[i].width - k.width() * SCALE_FACTOR)
				backgroundLayer[i].pos.x = i * backgroundLayer[i].width * 2;
		}
		else {
			// backgroundLayer[i].pos.x = playerX * speed;
			backgroundLayer[i].pos.y = backgroundCamY;
			if (backgroundLayer[i].pos.x <= i * backgroundLayer[i].width - k.width() * SCALE_FACTOR)
				backgroundLayer[i].pos.x = i * backgroundLayer[i].width * 2;

		}
	}
};
