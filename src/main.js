import { k } from "./KaboomCtx.js";
import { BACKGROUND_COUNT, OFFSET_X, OFFSET_Y, PLAYER_SPEED, PROJECT_LINKS, SCALE_FACTOR , DEF_SCALE_IND, INDICATOR_OFFSET, FURNITURES, BOOKS, HOVER_EVENTS} from "./constants.js";
import { createHoverEvents, createInteractable, displayDialogue, loadAllResources, setCamScale ,createIndicator, createTile, createBackground, updateBackground, getIndicatorOffset} from "./utils.js";

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
						const soLongIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
					  
						soLongIndicatorOffsets.forEach(({ dx, dy, direction }) => {
						  createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						});
					
						interactables.push(createInteractable(k, "tiles", boundary, 82, 0, 0));
					  }
					  if (boundary.name === "ft_printf") {
						const ftPrintfIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
						  
						ftPrintfIndicatorOffsets.forEach(({ dx, dy, direction }) => {
						createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						});

						  const interactable = createInteractable(k, "tiles", boundary, 13, 0 , 0);
						  const interactable2 = createInteractable(k, "tiles", boundary, 14, 32, 0);

						  interactables.push(interactable);
						  interactables.push(interactable2);
					  }
					if (boundary.name == "get_next_line") {
						const getNextLineIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
					  
						  getNextLineIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						interactables.push(createInteractable(k, "tiles", boundary, 124, 0, 0));
					}
					if (boundary.name == "pipex") {
						const modified_DEF_SCALE_IND = DEF_SCALE_IND.map(indicator => {
							if (indicator.name === "topLeft" || indicator.name === "topRight") {
							  return {
								...indicator,
								y: indicator.y * 2,
							  };
							}
							return indicator;
						  });
						const	pipexIndicatorOffsets = getIndicatorOffset(boundary, modified_DEF_SCALE_IND, INDICATOR_OFFSET);

						  pipexIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						interactables.push(createInteractable(k, "pipe", boundary, 0, 0, -8));
					}
					if (boundary.name == "libft") {
						const modified_DEF_SCALE_IND = DEF_SCALE_IND.map(indicator => {
							if (indicator.name === "bottomLeft" || indicator.name === "bottomRight") {
							  return {
								...indicator,
								y: indicator.y * -0.5,
							  };
							}
							return indicator;
						  }); 
						const	libftIndicatorOffsets = getIndicatorOffset(boundary, modified_DEF_SCALE_IND, INDICATOR_OFFSET);
					  
						  libftIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						  FURNITURES.forEach(({frame, x, y }) => {
							interactables.push(createInteractable(k, "furniture", boundary, frame, x, y));
						  });
					  }
					if (boundary.name === "push_swap") {
						const	pushSwapIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
					  
						  pushSwapIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						  BOOKS.forEach(({ type, x, y }) => {
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

	HOVER_EVENTS.forEach(event => {
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
