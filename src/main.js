import { k } from "./KaboomCtx.js";
import { dialogueData, offsetX, offsetY, scaleFactor } from "./constants.js";
import { createHoverEvents, createInteractable, displayDialogue, loadAllressources, setCamScale } from "./utils.js";

loadAllressources(k);

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
						const interactable = createInteractable(k, "tiles", boundary, 82, 28, 22);
						interactables.push(interactable);
					}
					if (boundary.name === "ft_printf") {
						const interactable = createInteractable(k, "tiles", boundary, 13, 32, 17);
						const interactable2 = createInteractable(k, "tiles", boundary, 14, 64, 17);
						interactables.push(interactable);
						interactables.push(interactable2);
					}
					if (boundary.name == "get_next_line") {
						const interactable = createInteractable(k, "tiles", boundary, 124, 31, 14);
						interactables.push(interactable);
					}
					if (boundary.name == "pipex") {
						const interactable = createInteractable(k, "pipe", boundary, 0, 31, 14);
						interactables.push(interactable);
					}
					if (boundary.name == "libft") {
						const interactable  = createInteractable(k, "furniture", boundary, 54, 32, 16);
						const interactable2 = createInteractable(k, "furniture", boundary, 55, 48, 16);
						const interactable3 = createInteractable(k, "furniture", boundary, 56, 64, 16);
						const interactable4 = createInteractable(k, "furniture", boundary, 67, 32, 32);
						const interactable5 = createInteractable(k, "furniture", boundary, 68, 48, 32);
						const interactable6 = createInteractable(k, "furniture", boundary, 69, 64, 32);
						const interactable7 = createInteractable(k, "furniture", boundary, 80, 32, 48);
						const interactable8 = createInteractable(k, "furniture", boundary, 81, 48, 48);
						const interactable9 = createInteractable(k, "furniture", boundary, 82, 64, 48);
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
						const interactable = createInteractable(k, "book", boundary, 0, 32, 28);
						const interactable2 = createInteractable(k, "book2", boundary, 0, 32, 48);
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

	createHoverEvents(k, "libft", 500, 250, 0.70, 26, 64, 600, 260);
	createHoverEvents(k, "get_next_line", 100, 20, 0.70, 26, 250, 150, 35);
	createHoverEvents(k, "ft_printf", 200, 110, 0.70, 26, 250, 280, 120);
	createHoverEvents(k, "pipex", 300, 350, 0.70, 26, 250, 400, 360);
	createHoverEvents(k, "so_long", 300, 150, 0.70, 26, 250, 390, 160);
	createHoverEvents(k, "push_swap", 450, 250, 0.70, 26, 250, 520, 260);

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

// TODO: Library hitbox is meh, you go through it and its weird, on the contrary pipe is a great idea.
// TODO: The parallax cannot be seen if we go at the limit of bottom