export function loadAllResources(k) {
    const resources = {
        fonts: [
            { name: "myFont", path: "assets/font/ThaleahFat.ttf" }
        ],
        sprites: [
            { name: "hover", path: "assets/hover/hover.png" },
            { name: "indicator", path: "assets/ui/1.png",
				config: { sliceX: 8, sliceY: 2,
				anims: { 
				"top_left": { from: 0, to: 3, loop: true, speed: 8 },
				"top_right": { from: 4, to: 7, loop: true, speed: 8 },
				"bot_left": { from: 8, to: 11, loop: true, speed: 8 },
				"bot_right": { from: 12, to: 15, loop: true, speed: 8 }
			} } },
            { name: "player", path: "assets/character/character.png", 
				config: { sliceX: 4, sliceY: 4,
				anims: {
					"idle-down": 0,
					"walk-down": { from: 0, to: 3, loop: true, speed: 8 },
					"idle-side": 4, "walk-side": { from: 4, to: 7, loop: true, speed: 8 },
					"idle-up": 12, "walk-up": { from: 12, to: 15, loop: true, speed: 8 }
				 } } },
            { name: "tiles", path: "assets/tiles/spritesheet.png",
				config:
				{ sliceX: 21, sliceY: 11}
			},
            { name: "pipe", path: "assets/pipe/1.png" },
            { name: "furniture", path: "assets/furniture/hous_furniture.png",
				config: { sliceX: 13, sliceY: 18 }
			},
            { name: "book", path: "assets/books/1.png" },
            { name: "book2", path: "assets/books/2.png" },
            { name: "background_1", path: "assets/background/1.png" },
            { name: "background_2", path: "assets/background/2.png" },
            { name: "background_3", path: "assets/background/3.png" },
            { name: "background_4", path: "assets/background/4.png" },
            { name: "background_5", path: "assets/background/5.png" },
            { name: "map", path: "assets/map/map.png" }
        ]
    }

    resources.fonts.forEach(font => {
        k.loadFont(font.name, font.path);
    });


    resources.sprites.forEach(sprite => {
        if (sprite.config) {
            k.loadSprite(sprite.name, sprite.path, sprite.config);
        } else {
            k.loadSprite(sprite.name, sprite.path);
        }
    });
};
