import { k } from "./KaboomCtx";
import { scaleFactor } from "./constants";

k.loadSprite("character", "./character.png", {
	sliceX: 8,
	sliceY: 8,
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
	const layer = mapData.layers;

	const map = k.make([
		k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
	
	const player = k.make([
		k.sprite("spritesheet", { anim: "idle-down" }),
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

});

k.go("main");