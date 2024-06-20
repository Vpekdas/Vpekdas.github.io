import { k } from "./KaboomCtx.js";

import * as GameConstants from './constants/GameConstants.js';
import * as UI from "./constants/UIConstants.js";
import * as ProjectConstants from "./constants/ProjectConstants.js";

import * as BackgroundUtils from "./utils/BackgroundUtils.js";
import * as CameraUtils from "./utils/cameraUtils.js";
import * as DialogueManager from "./utils/dialogueManager.js";
import * as EventHandlers from "./handlers/eventHandlers.js";
import * as GameElements from "./elements/gameElements.js";
import * as ResourceLoader from "./elements/resourceLoader.js";
import * as IndicatorUtils from "./utils/IndicatorUtils.js";

ResourceLoader.loadAllResources(k);

k.setBackground(k.Color.fromHex("#2e51b2"));

k.scene("main", async () => {
	const 	mapData = await (await fetch("assets/map/map.json")).json()
	const 	layers = mapData.layers;
	const 	interactables = [];
	const	backgrounds = [];


	for (let i = 0; i < GameConstants.BACKGROUND_COUNT; i++)
		backgrounds.push(BackgroundUtils.createBackground(k, 5, `background_${i + 1}`))

	const map = k.add([
		k.sprite("map"), k.pos(0), k.scale(GameConstants.SCALE_FACTOR)]);

	const player = k.add([
		k.sprite("player", { anim: "idle-down" }),
		k.area({
			shape: new k.Rect(k.vec2(0, 3), 10, 16),
		  }),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(GameConstants.SCALE_FACTOR),
		{
			speed: GameConstants.PLAYER_SPEED,
			direction: "down",
			isInDialogue: false,
		},
		"player",
	]);


for (let i = 0; i < 3; i++) {
	GameElements.createTile(k, "tiles", 2, 114 - 32 * i, 151);
	GameElements.createTile(k, "tiles", 23, 114 - 32 * i, 183);
}
  
for (let i = 0; i < 3; i++) {
	GameElements.createTile(k, "tiles", 153 + i, 48 + 32 * i, 150);
	GameElements.createTile(k, "tiles", 174 + i, 48 + 32 * i, 182);
}


	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x + GameConstants.OFFSET_X, boundary.y + GameConstants.OFFSET_Y),
					boundary.name,
				]);
				
				if (boundary.name) {
					if (boundary.name === "so_long") {
						const soLongIndicatorOffsets = IndicatorUtils.getIndicatorOffset(boundary, GameConstants.DEF_SCALE_IND, GameConstants.INDICATOR_OFFSET);
					  
						soLongIndicatorOffsets.forEach(({ dx, dy, direction }) => {
						  IndicatorUtils.createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						});
					
						interactables.push(GameElements.createInteractable(k, "tiles", boundary, 82, 0, 0));
					  }
					  if (boundary.name === "ft_printf") {
						const ftPrintfIndicatorOffsets = IndicatorUtils.getIndicatorOffset(boundary, GameConstants.DEF_SCALE_IND, GameConstants.INDICATOR_OFFSET);
						  
						ftPrintfIndicatorOffsets.forEach(({ dx, dy, direction }) => {
						IndicatorUtils.createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						});

						  const interactable = GameElements.createInteractable(k, "tiles", boundary, 13, 0 , 0);
						  const interactable2 = GameElements.createInteractable(k, "tiles", boundary, 14, 32, 0);

						  interactables.push(interactable);
						  interactables.push(interactable2);
					  }
					if (boundary.name == "get_next_line") {
						const getNextLineIndicatorOffsets = IndicatorUtils.getIndicatorOffset(boundary, GameConstants.DEF_SCALE_IND, GameConstants.INDICATOR_OFFSET);
					  
						  getNextLineIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							IndicatorUtils.createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						interactables.push(GameElements.createInteractable(k, "tiles", boundary, 124, 0, 0));
					}
					if (boundary.name == "pipex") {
						const modified_DEF_SCALE_IND = GameConstants.DEF_SCALE_IND.map(indicator => {
							if (indicator.name === "topLeft" || indicator.name === "topRight") {
							  return {
								...indicator,
								y: indicator.y * 2,
							  };
							}
							return indicator;
						  });
						const	pipexIndicatorOffsets = IndicatorUtils.getIndicatorOffset(boundary, modified_DEF_SCALE_IND, GameConstants.INDICATOR_OFFSET);

						  pipexIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							IndicatorUtils.createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						interactables.push(GameElements.createInteractable(k, "pipe", boundary, 0, 0, -8));
					}
					if (boundary.name == "libft") {
						const modified_DEF_SCALE_IND = GameConstants.DEF_SCALE_IND.map(indicator => {
							if (indicator.name === "bottomLeft" || indicator.name === "bottomRight") {
							  return {
								...indicator,
								y: indicator.y * -0.5,
							  };
							}
							return indicator;
						  }); 
						const	libftIndicatorOffsets = IndicatorUtils.getIndicatorOffset(boundary, modified_DEF_SCALE_IND, GameConstants.INDICATOR_OFFSET);
					  
						  libftIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							IndicatorUtils.createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						  GameConstants.FURNITURES.forEach(({frame, x, y }) => {
							interactables.push(GameElements.createInteractable(k, "furniture", boundary, frame, x, y));
						  });
					  }
					if (boundary.name === "push_swap") {
						const	pushSwapIndicatorOffsets = IndicatorUtils.getIndicatorOffset(boundary, GameConstants.DEF_SCALE_IND, GameConstants.INDICATOR_OFFSET);
					  
						  pushSwapIndicatorOffsets.forEach(({ dx, dy, direction }) => {
							IndicatorUtils.createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
						  });

						  GameConstants.BOOKS.forEach(({ type, x, y }) => {
							interactables.push(GameElements.createInteractable(k, type, boundary, 0, x, y));
						  });
					}

					player.onCollide(boundary.name,  () => {
						player.isInDialogue = true;
						DialogueManager.displayDialogue(ProjectConstants.PROJECT_LINKS[boundary.name], () => player.isInDialogue = false)
					});
				}
			}
			continue;
		}

		if (layer.name ===	"spawnpoint") {
			for (const entity of layer.objects) {
				if (entity.name === "player") {
					player.pos = k.vec2(
						(map.pos.x + entity.x + GameConstants.OFFSET_X) * GameConstants.SCALE_FACTOR,
						(map.pos.y + entity.y + GameConstants.OFFSET_Y) * GameConstants.SCALE_FACTOR
					);
					continue;
				}
			}
		}
	}

	CameraUtils.setCamScale(k);

	k.onResize(() => {
		CameraUtils.setCamScale(k);
	});

	k.onUpdate(() => {

		k.camPos(player.pos.x, player.pos.y + GameConstants.CAMERA_OFFSET_Y)

		const backgroundCamY = player.pos.y - GameConstants.BACKGROUND_OFFSET_Y;
		let	speed = 0;
	
		for (let i = 0; i < backgrounds.length; i++) {
			BackgroundUtils.updateBackground(k, backgrounds[i], speed, backgroundCamY, player.pos.x);
			speed += GameConstants.BACKGROUND_SPEED_INCREMENT;
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

	UI.HOVER_EVENTS.forEach(event => {
		EventHandlers.createHoverEvents(k, event);
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
// FIXME: Custom font does not work anymore.
// FIXME: For Parallax: Clouds must be updated every tickle, other background  on mouse down.
