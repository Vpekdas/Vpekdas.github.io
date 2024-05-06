import { k } from "./KaboomCtx.js";
import { dialogueData, offsetX, offsetY, scaleFactor } from "./constants.js";
import { createHoverEvents, createInteractable, displayDialogue, loadAllressources, setCamScale } from "./utils.js";

loadAllressources(k);

  function createInteractable2(boundary, offsetX, offsetY, scaleFactor, frame) {
	const originalSprite = k.add([
	  k.sprite("pipe", { frame }),
	  k.pos((boundary.x + offsetX) * scaleFactor, (boundary.y + offsetY) * scaleFactor),
	  k.scale(scaleFactor),
	]);
	const blinkSprite = k.add([
	  k.sprite("pipe", { frame }),
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
  }

  function createInteractable3(boundary, offsetX, offsetY, scaleFactor, frame) {
	const originalSprite = k.add([
	  k.sprite("furniture", { frame }),
	  k.pos((boundary.x + offsetX) * scaleFactor, (boundary.y + offsetY) * scaleFactor),
	  k.scale(scaleFactor),
	]);
	const blinkSprite = k.add([
	  k.sprite("furniture", { frame }),
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
  }

  function createInteractable4(boundary, offsetX, offsetY, scaleFactor, frame) {
	const originalSprite = k.add([
	  k.sprite("furniture", { frame }),
	  k.pos((boundary.x + offsetX) * scaleFactor, (boundary.y + offsetY) * scaleFactor),
	  k.scale(scaleFactor),
	]);
	const blinkSprite = k.add([
	  k.sprite("furniture", { frame }),
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
  }

  function createInteractable5(boundary, offsetX, offsetY, scaleFactor, frame) {
	const originalSprite = k.add([
	  k.sprite("book", { frame }),
	  k.pos((boundary.x + offsetX - 2) * scaleFactor, (boundary.y + offsetY + 5) * scaleFactor),
	  k.scale(scaleFactor),

	]);
	const blinkSprite = k.add([
	  k.sprite("book", { frame }),
	  k.pos((boundary.x + offsetX - 2) * scaleFactor, (boundary.y + offsetY + 5) * scaleFactor),
	  k.color(255, 255, 255),
	  k.opacity(0.75),
	  k.scale(scaleFactor),
	]);
  
	return {
	  originalSprite,
	  blinkSprite,
	  blink: false,
	};
  }

  function createInteractable6(boundary, offsetX, offsetY, scaleFactor, frame) {
	const originalSprite = k.add([
	  k.sprite("book2", { frame }),
	  k.pos((boundary.x + offsetX - 2) * scaleFactor, (boundary.y + offsetY + 5) * scaleFactor),
	  k.scale(scaleFactor),

	]);
	const blinkSprite = k.add([
	  k.sprite("book2", { frame }),
	  k.pos((boundary.x + offsetX - 2) * scaleFactor, (boundary.y + offsetY + 5) * scaleFactor),
	  k.color(255, 255, 255),
	  k.opacity(0.75),
	  k.scale(scaleFactor),
	]);
  
	return {
	  originalSprite,
	  blinkSprite,
	  blink: false,
	};
  }

k.setBackground(k.Color.fromHex("#000000"));

k.scene("main", async () => {
	const mapData = await (await fetch("./map.json")).json()
	const layers = mapData.layers;
	let interactables = [];

	const bg1 = k.add([
		k.sprite("1"), k.pos(0), k.scale(3)]);
	
	const bg1dup = k.add([
		k.sprite("1"), k.pos(bg1.width, 0), k.scale(3)]);

	const bg2dup = k.add([
		k.sprite("1"), k.pos(-bg1.width, 0), k.scale(3)]);

	const bg2 = k.add([
		k.sprite("2"), k.pos(0), k.scale(3)]);

	const bg3 = k.add([
		k.sprite("3"), k.pos(0), k.scale(3)]);

	const bg4 = k.add([
		k.sprite("4"), k.pos(0), k.scale(3)]);

	const bg5 = k.add([
		k.sprite("5"), k.pos(0), k.scale(3)]);

	const map = k.add([
		k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

	const player = k.add([
		k.sprite("player", { anim: "idle-down" }),
		k.area({
			shape: new k.Rect(k.vec2(0, 3), 10, 16),
		  }),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(2),
		{
			speed: 300,
			direction: "down",
			isInDialogue: false,
		},
		"player",
	]);


	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x + offsetX + 16, boundary.y + offsetY + 8),
					boundary.name,
				]);
				
				if (boundary.name) {
					if (boundary.name === "so_long") {
						const interactable = createInteractable(k, boundary, 82, 28, 22);
						interactables.push(interactable);
					}
					if (boundary.name === "printf") {
						const interactable = createInteractable(k, boundary, 13, 32, 17);
						const interactable2 = createInteractable(k, boundary, 14, 64, 17);
						interactables.push(interactable);
						interactables.push(interactable2);
					}
					if (boundary.name == "get_next_line") {
						const interactable = createInteractable(k, boundary, 124, 31, 14);
						interactables.push(interactable);
					}
					if (boundary.name == "pipex") {
						const interactable = createInteractable2(boundary, offsetX + 15, offsetY - 5, scaleFactor, 0);
						interactables.push(interactable);
					}
					if (boundary.name == "libft") {
						const interactable = createInteractable3(boundary, offsetX + 16, offsetY + 8, scaleFactor, 54);
						const interactable2 = createInteractable3(boundary, offsetX + 32, offsetY + 8, scaleFactor, 55);
						const interactable3 = createInteractable3(boundary, offsetX + 48, offsetY + 8, scaleFactor, 56);
						const interactable4 = createInteractable3(boundary, offsetX + 16, offsetY + 16 + 8, scaleFactor, 67);
						const interactable5 = createInteractable3(boundary, offsetX + 32, offsetY + 16 + 8, scaleFactor, 68);
						const interactable6 = createInteractable3(boundary, offsetX + 48, offsetY + 16 + 8, scaleFactor, 69);
						const interactable7 = createInteractable3(boundary, offsetX + 16, offsetY + 32 + 8, scaleFactor, 80);
						const interactable8 = createInteractable3(boundary, offsetX + 32, offsetY + 32 + 8, scaleFactor, 81);
						const interactable9 = createInteractable3(boundary, offsetX + 48, offsetY + 32 + 8, scaleFactor, 82);
						interactables.push(interactable);
						interactables.push(interactable2);
						interactables.push(interactable3);
						interactables.push(interactable4);
						interactables.push(interactable5);
						interactables.push(interactable6);
						interactables.push(interactable7);
						interactables.push(interactable8);
						interactables.push(interactable9);
					}
					if (boundary.name === "push_swap") {
						const interactable = createInteractable5(boundary, offsetX + 16, offsetY + 8, scaleFactor, 0);
						const interactable2 = createInteractable6(boundary, offsetX + 16, offsetY + 32, scaleFactor, 0);
						interactables.push(interactable);
						interactables.push(interactable2);
					}

					player.onCollide(boundary.name,  () => {
						player.isInDialogue = true;
						displayDialogue(dialogueData[boundary.name], () => player.isInDialogue = false)
					});
				}
			}
			continue;
		}

		if (layer.name ===	"spawnpoint") {
			for (const entity of layer.objects) {
				if (entity.name === "player") {
					player.pos = k.vec2(
						(map.pos.x + entity.x + offsetX ) * scaleFactor,
						(map.pos.y + entity.y + offsetY) * scaleFactor
					);
					continue;
				}
			}
		}
	}

	setCamScale(k);

	k.onResize(() => {
		setCamScale(k);
	});

	k.onUpdate(() => {

		k.camPos(player.pos.x, player.pos.y + 100)
	
		bg1.pos.x -= 0.15;
		bg1dup.pos.x -= 0.15;
		bg2dup.pos.x -= 0.15;
		bg2.pos.x = player.pos.x * 0.10;
		bg3.pos.x = player.pos.x * 0.20;
		bg4.pos.x = player.pos.x * 0.30;
		bg5.pos.x = player.pos.x * 0.60;
	
		if (bg1.pos.x <= -bg1.width)
			bg1.pos.x = 0;
		if (bg1dup.pos.x <= 0) {
			bg1dup.pos.x = bg1.width;
		}
		if (bg2dup.pos.x <= -bg1.width * 2) {
			bg2dup.pos.x = -bg1.width;
		}
		if (bg2.pos.x + bg2.width <= 0) bg2.pos.x = 0;
		if (bg3.pos.x + bg3.width <= 0) bg3.pos.x = 0;
		if (bg4.pos.x + bg4.width <= 0) bg4.pos.x = 0;
		if (bg5.pos.x + bg5.width <= 0) bg5.pos.x = 0;

		for (const interactable of interactables) {
			interactable.blink = Math.floor(k.time() / 0.5) % 2 === 0;
	
			if (interactable.blink) {
				interactable.originalSprite.hidden = true;
				interactable.blinkSprite.hidden = false;
			} else {
				interactable.originalSprite.hidden = false;
				interactable.blinkSprite.hidden = true;
			}
		}
	});

	createHoverEvents(k, "get_next_line");

	k.onMouseDown((mouseBtn) => {
		if (mouseBtn !== "left" || player.isInDialogue) {
			return;
		}
		const worldMousepos = k.toWorld(k.mousePos());
		player.moveTo(worldMousepos, player.speed);

		const mouseAngle = player.pos.angle(worldMousepos);
		const lowerBound = 50;
		const upperBound = 125;

		if (mouseAngle > lowerBound && mouseAngle < upperBound && player.curAnim() !== "walk-up") {
			player.play("walk-up");
			player.direction = "up";
			
		}
		if (mouseAngle < -lowerBound && mouseAngle > -upperBound && player.curAnim() !== "walk-down") {
			player.play("walk-down");
			player.direction = "down";
		}
		if (Math.abs(mouseAngle) < lowerBound) {
			player.flipX = true;
			if (player.curAnim() !== "walk-side") {
				player.play("walk-side");
				player.direction = "left";
			}
		}
		if (Math.abs(mouseAngle) > upperBound) {
			player.flipX = false;
			if (player.curAnim() !== "walk-side") {
				player.play("walk-side");
				player.direction = "right";
			}
		}
	});

	k.onMouseRelease(() => {
		if (player.direction === "down") {
			player.play("idle-down");
			return ;
		}
		if (player.direction === "up") {
			player.play("idle-up");
			return ;
		}
		player.play("idle-side");
	})

});

k.go("main");

// TODO: When mouse is over a interactible, show a dialogue button with the link in it (hover with kaboom).
// TODO: Library hitbox is meh, you go through it and its weird, on the contrary pipe is a great idea.
// TODO: Found a way to go through tiles => place them directly with kabbom.js so use this for go through door :)
// TODO: Found a way for parallax => place the same bg at pos 0, pos width and pos -width then reset at their initial pos if they are colliding,