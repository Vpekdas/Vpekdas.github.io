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