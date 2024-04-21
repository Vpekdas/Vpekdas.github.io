import { k } from "./KaboomCtx";
import { offsetX, offsetY, scaleFactor } from "./constants";
import { displayDialogue } from "./utils";

k.loadSprite("character", "./character.png", {
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

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#000000"));

k.scene("main", async () => {
	const mapData = await (await fetch("./map.json")).json()
	const layers = mapData.layers;

	const map = k.add([
		k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
	
	const player = k.add([
		k.sprite("character", { anim: "idle-down" }),
		k.area([
			{ shape: new k.Rect(k.vec2(0, 3), 10, 10) },
		]),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(scaleFactor),
		{
			speed: 250,
			direction: "down",
			isInDialogue: "false",
		},
		"player",
	]);

	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x, boundary.y),
					boundary.name,
				]);

				if (boundary.name) {
					player.onCollide(boundary.name,  () => {
						player.isInDialogue = true;
						displayDialogue("test", () => player.isInDialogue = false)
					});
				}
			}
			continue;
		}
		if (layer.name ===	"spawnpoint") {
			for (const entity of layer.objects) {
				if (entity.name === "player") {
					player.pos = k.vec2(
						(map.pos.x + entity.x + offsetX) * scaleFactor,
						(map.pos.y + entity.y + offsetY) * scaleFactor
					);
					k.add(player);
					continue;
				}
			}
		}
	}

	k.onUpdate(() => {
		k.camPos(player.pos.x, player.pos.y + 100)
	})
});

k.go("main");