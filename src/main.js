import { k } from "./KaboomCtx.js";
import { dialogueData, offsetX, offsetY, scaleFactor } from "./constants.js";
import { createHoverEvents, createInteractable, displayDialogue, loadAllressources, setCamScale ,createIndicator, createTile, createBackground} from "./utils.js";

loadAllressources(k);

k.setBackground(k.Color.fromHex("#2e51b2"));

k.scene("main", async () => {
	const mapData = await (await fetch("./map.json")).json()
	const layers = mapData.layers;
	let interactables = [];

	const background_1 = createBackground(k, 4, "background_1");
	const background_2 = createBackground(k, 4, "background_2");
	const background_3 = createBackground(k, 4, "background_3");
	const background_4 = createBackground(k, 4, "background_4");
	const background_5 = createBackground(k, 4, "background_5");

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


	const wall = createTile(k, "tiles", 2, 114, 151);
	const wall2 = createTile(k, "tiles", 23, 114, 183);
	const wall3 = createTile(k, "tiles", 2, 82, 151);
	const wall4 = createTile(k, "tiles", 23, 82, 183);
	const wall5 = createTile(k, "tiles", 2, 50, 151);
	const wall6 = createTile(k, "tiles", 23, 50, 183);


	const door2 = createTile(k, "tiles", 153, 48, 150);
	const door3 = createTile(k, "tiles", 154, 80, 150);
	const door4 = createTile(k, "tiles", 155, 112, 150);
	const door5 = createTile(k, "tiles", 174, 48, 182);
	const door6 = createTile(k, "tiles", 175, 80, 182);
	const door7 = createTile(k, "tiles", 176, 112, 182);


	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x + offsetX, boundary.y + offsetY),
					boundary.name,
				]);
				
				if (boundary.name) {
					if (boundary.name === "so_long") {
						const indicator1 = createIndicator(boundary.x - 8, boundary.y - 8, "top_left", k);
						const indicator3 = createIndicator(boundary.x - 8, boundary.y + boundary.height - 8, "bot_left", k);
						const indicator2 = createIndicator(boundary.x + boundary.width - 8 , boundary.y - 8, "top_right", k);
						const indicator4 = createIndicator(boundary.x + boundary.width - 8, boundary.y + boundary.height - 8, "bot_right", k);

						const interactable = createInteractable(k, "tiles", boundary, 82, 0 ,0);
						interactables.push(interactable);
					}
					if (boundary.name === "ft_printf") {
						const indicator1 = createIndicator(boundary.x + 22, boundary.y + 10, "top_left", k);
						const indicator2 = createIndicator(boundary.x + 86, boundary.y + 10, "top_right", k);
						const indicator3 = createIndicator(boundary.x + 22, boundary.y + 38, "bot_left", k);
						const indicator4 = createIndicator(boundary.x + 86, boundary.y + 38, "bot_right", k);

						const interactable = createInteractable(k, "tiles", boundary, 13, 0 , 0);
						const interactable2 = createInteractable(k, "tiles", boundary, 14, 32, 0);
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
		
		const backgroundCamY = player.pos.y - 200;

		for (let i = 0; i < background_1.length; i++) {
			background_1[i].pos.x -= scaleFactor;
			// background_1[i].pos.y = backgroundCamY;
			if (background_1[i].pos.x <= i * background_1[i].width - k.width() * scaleFactor)
				background_1[i].pos.x = i * background_1[i].width * 2;
		}

		for (let i = 0; i < background_2.length; i++) {
			background_2[i].pos.x = player.pos.x * 0.20;
			background_2[i].pos.y = backgroundCamY;
			if (background_2[i].pos.x <= i * background_2[i].width - k.width() * scaleFactor)
				background_2[i].pos.x = i * background_2[i].width * 2;
		}

		for (let i = 0; i < background_3.length; i++) {
			background_3[i].pos.x = player.pos.x * 0.30;
			background_3[i].pos.y = backgroundCamY;
			if (background_3[i].pos.x <= i * background_3[i].width - k.width() * scaleFactor)
				background_3[i].pos.x = i * background_3[i].width * 2;
		}

		for (let i = 0; i < background_4.length; i++) {
			background_4[i].pos.x = player.pos.x * 0.50;
			background_4[i].pos.y = backgroundCamY;
			if (background_4[i].pos.x <= i * background_4[i].width - k.width() * scaleFactor)
				background_4[i].pos.x = i * background_4[i].width * 2;
		}

		for (let i = 0; i < background_5.length; i++) {
			background_5[i].pos.x = player.pos.x * 0.70;
			background_5[i].pos.y = backgroundCamY;
			if (background_5[i].pos.x <= i * background_5[i].width - k.width() * scaleFactor)
				background_5[i].pos.x = i * background_5[i].width * 2;
		}

	

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

// TODO: Write a description for project.
// TODO: Add minishell and philosopher project.
// TODO: Add blinking and interactable for remaining project.
