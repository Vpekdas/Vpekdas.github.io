import {SCALE_FACTOR, OFFSET_X, OFFSET_Y} from "./constants.js";

export function displayDialogue(text, onDisplayEnd) {
	const dialogueUI = document.getElementById("textbox-container");
	const dialogue = document.getElementById("dialogue");

	dialogueUI.style.display = "block";

	let index = 0;
	let currentText = "";
	const intervalRef = setInterval(() => {
		if (index < text.length) {
			currentText += text[index];
			dialogue.innerHTML = currentText;
			index++;
			return;
		}
		clearInterval(intervalRef);
	}, 5);

	const closeBtn = document.getElementById("close");

	function onCloseClick() {
		onDisplayEnd();
		dialogueUI.style.display = "none";
		dialogue.innerHTML = "";
		clearInterval(intervalRef);
		closeBtn.removeEventListener("click", onCloseClick);
	}

	closeBtn.addEventListener("click", onCloseClick);
}

export function setCamScale(k) {
	const  resizeFactor = k.width() / k.height();
	if (resizeFactor < 1) {
		k.camScale(k.vec2(1));
		return;
	}

	k.camScale(k.vec2(1.5));
}

export function createHoverEvents(k, options) {
	let { name, bubbleX, bubbleY, bubbleScale, textSize, textWidth, textX, textY, sprite = "hover", font = "myFont" } = options;
	let bubble = null;
	let bubbleText = null;
  
	k.onHover(name, (obj) => {
	  if (!bubble) {
		bubble = k.add([
		  k.sprite(sprite),
		  k.pos(obj.pos.x + bubbleX, obj.pos.y + bubbleY),
		  k.scale(bubbleScale),
		]);
  
		bubbleText = k.add([
		  k.text(name, {
			size: textSize,
			width: textWidth,
			font: font,
		  }),
		  k.pos(obj.pos.x + textX, obj.pos.y + textY),
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
  };

  export function loadAllResources(k) {
    const resources = {
        fonts: [
            { name: "myFont", path: "ThaleahFat.ttf" }
        ],
        sprites: [
            { name: "hover", path: "./hover/hover.png" },
            { name: "indicator", path: "./ui/1.png",
				config: { sliceX: 8, sliceY: 2,
				anims: { 
				"top_left": { from: 0, to: 3, loop: true, speed: 8 },
				"top_right": { from: 4, to: 7, loop: true, speed: 8 },
				"bot_left": { from: 8, to: 11, loop: true, speed: 8 },
				"bot_right": { from: 12, to: 15, loop: true, speed: 8 }
			} } },
            { name: "player", path: "./character/character.png", 
				config: { sliceX: 4, sliceY: 4,
				anims: {
					"idle-down": 0,
					"walk-down": { from: 0, to: 3, loop: true, speed: 8 },
					"idle-side": 4, "walk-side": { from: 4, to: 7, loop: true, speed: 8 },
					"idle-up": 12, "walk-up": { from: 12, to: 15, loop: true, speed: 8 }
				 } } },
            { name: "tiles", path: "./spritesheet.png",
				config:
				{ sliceX: 21, sliceY: 11}
			},
            { name: "pipe", path: "./pipe/1.png" },
            { name: "furniture", path: "./furniture/hous_furniture.png",
				config: { sliceX: 13, sliceY: 18 }
			},
            { name: "book", path: "./books/1.png" },
            { name: "book2", path: "./books/2.png" },
            { name: "background_1", path: "./background/1.png" },
            { name: "background_2", path: "./background/2.png" },
            { name: "background_3", path: "./background/3.png" },
            { name: "background_4", path: "./background/4.png" },
            { name: "background_5", path: "./background/5.png" },
            { name: "map", path: "./map.png" }
        ]
    };

    resources.fonts.forEach(font => {
        k.loadFont(font.name, font.path);
    });

    resources.sprites.forEach(sprite => {
        if (sprite.config) {
            k.loadSprite(sprite.name, sprite.path, sprite.config);
        } else {
            k.loadSprite(sprite.name, sprite.path);
        }
    });
};
  

  export function createTile(k, tiles, frame, x, y) {
	const originalSprite = k.add([
	  k.sprite(tiles, { frame }),
	  k.pos(x * SCALE_FACTOR, y * SCALE_FACTOR),
	  k.scale(SCALE_FACTOR),
	]);

	return originalSprite;
}

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

  export function 
  createIndicator(x, y, animation, k) {
    const indicator = k.add([
        k.sprite("indicator"),
        k.pos((x + OFFSET_X) * SCALE_FACTOR, (y + OFFSET_Y) * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
    ]);
    indicator.play(animation);
}

export function createBackground(k, backgroundNumber, spriteName) {

	const	backgroundArray = [];
	const	tempSprite = k.add([k.sprite(spriteName)]);
	const	spriteWidth = tempSprite.width;

	for (let i = 0; i < backgroundNumber; i++) {
		backgroundArray.push(k.add ([
			k.sprite(spriteName),
			k.pos(i * spriteWidth - k.width() * SCALE_FACTOR, 0),
			k.scale(SCALE_FACTOR)
		]));
		console.log("pos : %d", backgroundArray[i].pos.x);
	}
	destroy(tempSprite);
	return backgroundArray;
}

export function updateBackground (k, backgroundLayer, speed, backgroundCamY, playerX) {
	for (let i = 0; i < backgroundLayer.length; i++) {
		if (speed === 0) {
			backgroundLayer[i].pos.x -= SCALE_FACTOR;
			if (backgroundLayer[i].pos.x <= i * backgroundLayer[i].width - k.width() * SCALE_FACTOR)
				backgroundLayer[i].pos.x = i * backgroundLayer[i].width * 2;
		}
		else {
			backgroundLayer[i].pos.x = playerX * 0.10;
			backgroundLayer[i].pos.y = backgroundCamY;
			if (backgroundLayer[i].pos.x <= i * backgroundLayer[i].width - k.width() * SCALE_FACTOR)
				backgroundLayer[i].pos.x = i * backgroundLayer[i].width * 2;
		}
	}
}