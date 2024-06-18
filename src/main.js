import { k } from "./KaboomCtx.js";
import { BACKGROUND_COUNT, OFFSET_X, OFFSET_Y, PLAYER_SPEED, PROJECT_LINKS, SCALE_FACTOR } from "./constants.js";
import { createHoverEvents, createInteractable, displayDialogue, loadAllResources, setCamScale ,createIndicator, createTile, createBackground, updateBackground} from "./utils.js";

loadAllResources(k);

k.setBackground(k.Color.fromHex("#2e51b2"));

k.scene("main", async () => {
	const 	mapData = await (await fetch("./map.json")).json()
	const 	layers = mapData.layers;
	const 	interactables = [];
	const	backgrounds = [];

	for (let i = 0; i < BACKGROUND_COUNT; i++)
		backgrounds.push(createBackground(k, 4, `background_${i + 1}`))

	const map = k.add([
		k.sprite("map"), k.pos(0), k.scale(SCALE_FACTOR)]);

	const player = k.add([
		k.sprite("player", { anim: "idle-down" }),
		k.area({
			shape: new k.Rect(k.vec2(0, 3), 10, 16),
		  }),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(SCALE_FACTOR),
		{
			speed: PLAYER_SPEED,
			direction: "down",
			isInDialogue: false,
		},
		"player",
	]);


for (let i = 0; i < 3; i++) {
	createTile(k, "tiles", 2, 114 - 32 * i, 151);
	createTile(k, "tiles", 23, 114 - 32 * i, 183);
  }
  
  for (let i = 0; i < 3; i++) {
	createTile(k, "tiles", 153 + i, 48 + 32 * i, 150);
	createTile(k, "tiles", 174 + i, 48 + 32 * i, 182);
  }


	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x + OFFSET_X, boundary.y + OFFSET_Y),
					boundary.name,
				]);
				
				if (boundary.name) {
					if (boundary.name === "so_long") {
						const soLongIndicatorOffsets = [
						  { dx: -8, dy: -8, direction: "top_left" },
						  { dx: -8, dy: boundary.height - 8, direction: "bot_left" },
						  { dx: boundary.width - 8, dy: -8, direction: "top_right" },
						  { dx: boundary.width - 8, dy: boundary.height - 8, direction: "bot_right" }
						];
					  
						soLongIndicatorOffsets.forEach(({ dx, dy, direction }) => {
						  createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						});
					  
						interactables.push(createInteractable(k, "tiles", boundary, 82, 0, 0));
					  }
					  if (boundary.name === "ft_printf") {
						const ftPrintfIndicatorOffsets = [
								{ dx: -8, dy: -8, direction: "top_left" },
								{ dx: -8, dy: boundary.height - 8, direction: "bot_left" },
								{ dx: boundary.width - 8, dy: -8, direction: "top_right" },
								{ dx: boundary.width - 8, dy: boundary.height - 8, direction: "bot_right" }
							  ];
						  
							  ftPrintfIndicatorOffsets.forEach(({ dx, dy, direction }) => {
								createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
							  });

						  const interactable = createInteractable(k, "tiles", boundary, 13, 0 , 0);
						  const interactable2 = createInteractable(k, "tiles", boundary, 14, 32, 0);
						  interactables.push(interactable);
						  interactables.push(interactable2);
					  }
					if (boundary.name == "get_next_line") {
						const getNextLineIndicatorOffsets = [
							{ dx: -8, dy: -8, direction: "top_left" },
							{ dx: -8, dy: boundary.height - 8, direction: "bot_left" },
							{ dx: boundary.width - 8, dy: -8, direction: "top_right" },
							{ dx: boundary.width - 8, dy: boundary.height - 8, direction: "bot_right" }
						  ];
					  
						  getNextLineIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });
						interactables.push(createInteractable(k, "tiles", boundary, 124, 0, 0));
					}
					if (boundary.name == "pipex") {
						const pipexIndicatorOffsets = [
							{ dx: -8, dy: -16, direction: "top_left" },
							{ dx: -8, dy: boundary.height - 8, direction: "bot_left" },
							{ dx: boundary.width - 0, dy: -16, direction: "top_right" },
							{ dx: boundary.width - 0, dy: boundary.height - 8, direction: "bot_right" }
						  ];
					  
						  pipexIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });
						interactables.push(createInteractable(k, "pipe", boundary, 0, 0, -8));
					}
					if (boundary.name == "libft") {
						const libftIndicatorOffsets = [
							{ dx: -16, dy: -8, direction: "top_left" },
							{ dx: -16, dy: boundary.height - 0, direction: "bot_left" },
							{ dx: boundary.width - 0, dy: -8, direction: "top_right" },
							{ dx: boundary.width - 0, dy: boundary.height - 0, direction: "bot_right" }
						  ];
					  
						  libftIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });
						const furnitures = [
							{ frame: 54, x: 0, y: 8 },
							{ frame: 55, x: 16, y: 8 },
							{ frame: 56, x: 32, y: 8 },
							{ frame: 67, x: 0, y: 24 },
							{ frame: 68, x: 16, y: 24 },
							{ frame: 69, x: 32, y: 24 },
							{ frame: 80, x: 0, y: 40 },
							{ frame: 81, x: 16, y: 40 },
							{ frame: 82, x: 32, y: 40 }
						  ];
						  
						  furnitures.forEach(({frame, x, y }) => {
							interactables.push(createInteractable(k, "furniture", boundary, frame, x, y));
						  });
					  }
					if (boundary.name === "push_swap") {
						const pushSwapIndicatorOffsets = [
							{ dx: -8, dy: -8, direction: "top_left" },
							{ dx: -8, dy: boundary.height - 8, direction: "bot_left" },
							{ dx: boundary.width - 8, dy: -8, direction: "top_right" },
							{ dx: boundary.width - 8, dy: boundary.height - 8, direction: "bot_right" }
						  ];
					  
						  pushSwapIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });
						const books = [
							{ type: "book", x: 0, y: 0 },
							{ type: "book2", x: 0, y: 24 }
						  ];
						  
						  books.forEach(({ type, x, y }) => {
							interactables.push(createInteractable(k, type, boundary, 0, x, y));
						  });
					}

					player.onCollide(boundary.name,  () => {
						player.isInDialogue = true;
						displayDialogue(PROJECT_LINKS[boundary.name], () => player.isInDialogue = false)
					});
				}
			}
			continue;
		}

		if (layer.name ===	"spawnpoint") {
			for (const entity of layer.objects) {
				if (entity.name === "player") {
					player.pos = k.vec2(
						(map.pos.x + entity.x + OFFSET_X) * SCALE_FACTOR,
						(map.pos.y + entity.y + OFFSET_Y) * SCALE_FACTOR
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
		let	speed = 0;

		for (let i = 0; i < backgrounds.length; i++) {
			updateBackground(k, backgrounds[i], speed, backgroundCamY, player.pos.x);
			speed += 0.20;
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
	const hoverEvents = [
		{ name: "libft", bubbleX: 500, bubbleY: 250, bubbleScale: 0.70, textSize: 26, textWidth: 64, textX: 600, textY: 260 },
		{ name: "get_next_line", bubbleX: 100, bubbleY: 20, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 150, textY: 35 },
		{ name: "ft_printf", bubbleX: 200, bubbleY: 110, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 280, textY: 120 },
		{ name: "pipex", bubbleX: 300, bubbleY: 350, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 400, textY: 360 },
		{ name: "so_long", bubbleX: 300, bubbleY: 150, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 390, textY: 160 },
		{ name: "push_swap", bubbleX: 450, bubbleY: 250, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 520, textY: 260 }
	];

	hoverEvents.forEach(event => {
		createHoverEvents(k, event);
	});

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
