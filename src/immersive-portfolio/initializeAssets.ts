import type { KAPLAYCtx } from "kaplay";

interface FontResource {
    name: string;
    path: string;
}

interface AnimConfig {
    from: number;
    to: number;
    loop: boolean;
    speed: number;
}

interface SpriteConfig {
    sliceX: number;
    sliceY: number;
    anims?: Record<string, AnimConfig | number>;
}

interface SpriteResource {
    name: string;
    path: string;
    config?: SpriteConfig;
}

interface Resources {
    fonts: FontResource[];
    sprites: SpriteResource[];
}

export function loadAllResources(k: KAPLAYCtx) {
    const resources: Resources = {
        fonts: [{ name: "myFont", path: "assets/ThaleahFat.ttf" }],
        sprites: [
            { name: "hover", path: "assets/UI/hover.png" },
            {
                name: "indicator",
                path: "assets/UI/1.png",
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
                path: "assets/character/character.png",
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
                name: "tiles",
                path: "assets/tiles/spritesheet.png",
                config: { sliceX: 21, sliceY: 11 },
            },
            { name: "philosophers", path: "assets/tiles/philosophers.png" },
            { name: "unity", path: "assets/tiles/unity.png" },
            { name: "scop", path: "assets/tiles/scop.png" },
            { name: "ft_transcendance", path: "assets/tiles/ft_transcendance.png" },
            { name: "door", path: "assets/tiles/door.png" },
            { name: "early-morning-1", path: "assets/background/early-morning/1.png" },
            { name: "early-morning-2", path: "assets/background/early-morning/2.png" },
            { name: "early-morning-3", path: "assets/background/early-morning/3.png" },
            { name: "early-morning-4", path: "assets/background/early-morning/4.png" },
            { name: "early-morning-5", path: "assets/background/early-morning/5.png" },
            { name: "morning-1", path: "assets/background/morning/1.png" },
            { name: "morning-2", path: "assets/background/morning/2.png" },
            { name: "morning-3", path: "assets/background/morning/3.png" },
            { name: "morning-4", path: "assets/background/morning/4.png" },
            { name: "morning-5", path: "assets/background/morning/5.png" },
            { name: "afternoon-1", path: "assets/background/afternoon/1.png" },
            { name: "afternoon-2", path: "assets/background/afternoon/2.png" },
            { name: "afternoon-3", path: "assets/background/afternoon/3.png" },
            { name: "afternoon-4", path: "assets/background/afternoon/4.png" },
            { name: "afternoon-5", path: "assets/background/afternoon/5.png" },
            { name: "evening-1", path: "assets/background/evening/1.png" },
            { name: "evening-2", path: "assets/background/evening/2.png" },
            { name: "evening-3", path: "assets/background/evening/3.png" },
            { name: "evening-4", path: "assets/background/evening/4.png" },
            { name: "evening-5", path: "assets/background/evening/5.png" },
            { name: "night-1", path: "assets/background/night/1.png" },
            { name: "night-2", path: "assets/background/night/2.png" },
            { name: "night-3", path: "assets/background/night/3.png" },
            { name: "night-4", path: "assets/background/night/4.png" },
            { name: "night-5", path: "assets/background/night/5.png" },
            { name: "map", path: "assets/map/map.png" },
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
