export function loadAllResources(k) {
    const resources = {
        fonts: [{ name: "myFont", path: "ThaleahFat.ttf" }],
        sprites: [
            { name: "hover", path: "./hover/hover.png" },
            {
                name: "indicator",
                path: "./ui/1.png",
                config: {
                    sliceX: 8,
                    sliceY: 2,
                    anims: {
                        top_left: { from: 0, to: 3, loop: true, speed: 8 },
                        top_right: { from: 4, to: 7, loop: true, speed: 8 },
                        bot_left: { from: 8, to: 11, loop: true, speed: 8 },
                        bot_right: { from: 12, to: 15, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "player",
                path: "/character/character.png",
                config: {
                    sliceX: 4,
                    sliceY: 4,
                    anims: {
                        "idle-down": 0,
                        "walk-down": { from: 0, to: 3, loop: true, speed: 8 },
                        "idle-side": 4,
                        "walk-side": { from: 4, to: 7, loop: true, speed: 8 },
                        "idle-up": 12,
                        "walk-up": { from: 12, to: 15, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "okabe",
                path: "/steins-gate/okabe.png",
                config: {
                    sliceX: 5,
                    sliceY: 1,
                    anims: {
                        idle: { from: 0, to: 2, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "kurisu",
                path: "/steins-gate/kurisu.png",
                config: {
                    sliceX: 5,
                    sliceY: 3,
                    anims: {
                        idle: { from: 0, to: 11, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "steins-gate-background",
                path: "/steins-gate/background.png",
                config: {
                    sliceX: 4,
                    sliceY: 3,
                    anims: {
                        opening: { from: 0, to: 11, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "lightning",
                path: "lightning/4.png",
                config: {
                    sliceX: 3,
                    sliceY: 3,
                    anims: {
                        shock: { from: 0, to: 6, loop: true, speed: 18 },
                    },
                },
            },
            {
                name: "lightning2",
                path: "lightning/3.png",
                config: {
                    sliceX: 3,
                    sliceY: 3,
                    anims: {
                        shock: { from: 0, to: 6, loop: true, speed: 18 },
                    },
                },
            },
            {
                name: "tiles",
                path: "/tiles/spritesheet.png",
                config: { sliceX: 21, sliceY: 11 },
            },
            {
                name: "furniture",
                path: "/furniture/hous_furniture.png",
                config: { sliceX: 13, sliceY: 18 },
            },
            { name: "books", path: "/books/books.png" },
            { name: "pipe", path: "/pipe/1.png" },
            { name: "early-morning-1", path: "/background/early-morning/1.png" },
            { name: "early-morning-2", path: "/background/early-morning/2.png" },
            { name: "early-morning-3", path: "/background/early-morning/3.png" },
            { name: "early-morning-4", path: "/background/early-morning/4.png" },
            { name: "early-morning-5", path: "/background/early-morning/5.png" },
            { name: "morning-1", path: "/background/morning/1.png" },
            { name: "morning-2", path: "/background/morning/2.png" },
            { name: "morning-3", path: "/background/morning/3.png" },
            { name: "morning-4", path: "/background/morning/4.png" },
            { name: "morning-5", path: "/background/morning/5.png" },
            { name: "afternoon-1", path: "/background/afternoon/1.png" },
            { name: "afternoon-2", path: "/background/afternoon/2.png" },
            { name: "afternoon-3", path: "/background/afternoon/3.png" },
            { name: "afternoon-4", path: "/background/afternoon/4.png" },
            { name: "afternoon-5", path: "/background/afternoon/5.png" },
            { name: "evening-1", path: "/background/evening/1.png" },
            { name: "evening-2", path: "/background/evening/2.png" },
            { name: "evening-3", path: "/background/evening/3.png" },
            { name: "evening-4", path: "/background/evening/4.png" },
            { name: "evening-5", path: "/background/evening/5.png" },
            { name: "night-1", path: "/background/night/1.png" },
            { name: "night-2", path: "/background/night/2.png" },
            { name: "night-3", path: "/background/night/3.png" },
            { name: "night-4", path: "/background/night/4.png" },
            { name: "night-5", path: "/background/night/5.png" },
            { name: "map", path: "/map/map.png" },
            { name: "msg", path: "/menu/Msg01.png" },
            { name: "msg2", path: "/menu/Msg03.png" },
            { name: "msg3", path: "/menu/Msg10.png" },
            { name: "menu-background", path: "background/Cyberpunk_city_street.gif" },
            { name: "phonewawe", path: "/steins-gate/phonewawe.png" },
            { name: "sg-001", path: "/steins-gate/sg-001.png" },
            { name: "library", path: "/furniture/library.png" },
            { name: "homeSweetHome", path: "/tiles/homeSweetHome.png" },
            { name: "table", path: "/tiles/table.png" },
            { name: "computers", path: "/tiles/computers.png" },
        ],
    };

    resources.fonts.forEach((font) => {
        k.loadFont(font.name, font.path);
    });

    resources.sprites.forEach((sprite) => {
        if (sprite.config) {
            k.loadSprite(sprite.name, sprite.path, sprite.config);
        } else {
            k.loadSprite(sprite.name, sprite.path);
        }
    });
}
