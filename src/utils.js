import { dialogueData, offsetX, offsetY, scaleFactor } from "./constants.js";

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

export function createHoverEvents(k, projectName, bubbleX, bubbleY, bubbleScale, textSize, textWidth, textX, textY) {
	let bubble = null;
	let bubbleText = null;
  
	k.onHover(projectName, (obj) => {
	  if (!bubble) {
		bubble = k.add([
		  k.sprite("hover"),
		  k.pos(obj.pos.x + bubbleX, obj.pos.y + bubbleY),
		  k.scale(bubbleScale),
		]);
  
		bubbleText = k.add([
		  k.text(projectName, {
			size: textSize,
			width: textWidth,
			font: "myFont",
		  }),
		  k.pos(obj.pos.x + textX, obj.pos.y + textY),
		]);
	  }
	});
  
	k.onHoverEnd(projectName, (obj) => {
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

  export function loadAllressources (k) {
	k.loadFont("myFont", "ThaleahFat.ttf");

	k.loadSprite("hover", "./hover/hover.png");
	
	k.loadSprite("indicator", "./ui/1.png", {
		sliceX: 8,
		sliceY: 2,
		anims: {
			"top_left": {from: 0, to: 3, loop: true, speed: 8 },
			"top_right": {from: 4, to: 7, loop: true, speed: 8 },
			"bot_left": {from: 8, to: 11, loop: true, speed: 8 },
			"bot_right": {from: 12, to: 15, loop: true, speed: 8 },
		},
	});

	k.loadSprite("player", "./character/character.png", {
		sliceX: 4,
		sliceY: 4,
		anims: {
			"idle-down": 0,
			"walk-down": {from: 0, to: 3, loop: true, speed: 8 },
			"idle-side": 4,
			"walk-side": {from: 4, to: 7, loop: true, speed: 8 },
			"idle-up": 12,
			"walk-up": {from: 12, to: 15, loop: true, speed: 8 },
		},
	});
	
	k.loadSprite("tiles", "./spritesheet.png", {
		sliceX: 21,
		sliceY: 11,
	});
	
	k.loadSprite("pipe", "./pipe/1.png");
	
	k.loadSprite("furniture", "./furniture/hous_furniture.png", {
		sliceX: 13,
		sliceY: 18,
	});
	
	k.loadSprite("book", "./books/1.png");
	k.loadSprite("book2", "./books/2.png");
	
	k.loadSprite("1", "./background/1.png");
	k.loadSprite("2", "./background/2.png");
	k.loadSprite("3", "./background/3.png");
	k.loadSprite("4", "./background/4.png");
	k.loadSprite("5", "./background/5.png");
	
	k.loadSprite("map", "./map.png");
  };
  
  export function createInteractable(k, tiles ,boundary, frame, offsetX, offsetY) {
	const originalSprite = k.add([
	  k.sprite(tiles, { frame }),
	  k.pos((boundary.x + offsetX ) * scaleFactor, (boundary.y + offsetY) * scaleFactor),
	  k.scale(scaleFactor),
	]);
	const blinkSprite = k.add([
	  k.sprite(tiles, { frame }),
	  k.pos((boundary.x + offsetX) * scaleFactor, (boundary.y + offsetY) * scaleFactor),
	  k.color(255, 255, 255),
	  k.opacity(0.75),
	  k.scale(scaleFactor),
	]);
  
	return {
	  originalSprite,
	  blinkSprite,
	  blink: false,
	};
  };

  export function createIndicator(x, y, animation, k) {
    const indicator = k.add([
        k.sprite("indicator"),
        k.pos(x * scaleFactor, y * scaleFactor),
        k.scale(scaleFactor),
    ]);
    indicator.play(animation);
    return indicator;
}