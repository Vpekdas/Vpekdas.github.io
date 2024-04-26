import { k } from "./KaboomCtx";
import { dialogueData, offsetX, offsetY, scaleFactor } from "./constants";
import { displayDialogue, setCamScale } from "./utils";

k.loadSprite("player", "./character.png", {
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

k.loadSprite("so_long", "./spritesheet.png", {
    sliceX: 21,
    sliceY: 11,
});

k.loadSprite("1", "./1.png");
k.loadSprite("2", "./2.png");
k.loadSprite("3", "./3.png");
k.loadSprite("4", "./4.png");
k.loadSprite("5", "./5.png");

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#000000"));

k.scene("main", async () => {
	const mapData = await (await fetch("./map.json")).json()
	const layers = mapData.layers;

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

	let interactables = [];
	
	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x + offsetX + 2, boundary.y + offsetY + 8),
					boundary.name,
				]);
				
				if (boundary.name) {
					const originalSprite = k.add([
						k.sprite("so_long", { frame: 82 }),
						k.pos((boundary.x + offsetX - 2) * scaleFactor, (boundary.y + offsetY + 5) * scaleFactor),
						k.scale(scaleFactor),
					]);
					const blinkSprite = k.add([
						k.sprite("so_long", { frame: 82 }),
						k.pos((boundary.x + offsetX - 2) * scaleFactor, (boundary.y + offsetY + 5) * scaleFactor),
						k.color(127, 0, 255),
						k.opacity(0.4),
						k.scale(scaleFactor),

					]);

					const interactable = {
						originalSprite,
						blinkSprite,
						blink: false,
					};
					interactables.push(interactable);

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
		bg5.pos.x = player.pos.x * 0.40;
	
		if (bg1.pos.x + bg1.width <= 0) bg1.pos.x = 0 ;
		if (bg1dup.pos.x <= 300) {
			bg1dup.pos.x = bg1.width;
		}
		if (bg2dup.pos.x <= -1000) {
			bg2dup.pos.x = bg1.width;
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

// TODO: When mouse is over a interactible, show a dialogue button with the link in it
// TODO: Add some effect on interactible things
// FIXME: Adjust parallax correctly, sometimes it reset too early