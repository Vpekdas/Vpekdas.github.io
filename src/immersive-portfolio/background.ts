import type { GameObj, KAPLAYCtx } from "kaplay";
import { getCurrentHour } from "./utils.js";
import { BACKGROUND_COUNT, BACKGROUND_H, BACKGROUND_SCALE, BACKGROUND_W, CLOUD_SPEED } from "./constants.js";

interface BackgroundsList {
    background: BackgroundProps[];
    leftBound: number;
    rightBound: number;
}

interface BackgroundProps {
    layer: GameObj[];
}

/**
 * Returns the appropriate background sprite name based on the current hour.
 * @returns {string} The background time ("early-morning", "morning", "afternoon", "evening", or "night").
 */
function getBackgroundTime(): string {
    const hour = getCurrentHour();

    if (hour >= 5 && hour < 8) {
        return "early-morning";
    } else if (hour >= 8 && hour < 12) {
        return "morning";
    } else if (hour >= 12 && hour < 18) {
        return "afternoon";
    } else if (hour >= 18 && hour < 23) {
        return "evening";
    } else {
        return "night";
    }
}

/**
 * Creates and returns the background.
 * @param {KAPLAYCtx} k Kaplay context.
 * @returns {BackgroundsList} An array containing 5 layers for each background.
 */
export function createBackground(k: KAPLAYCtx): BackgroundsList {
    const backgroundTime = getBackgroundTime();

    const backgroundsList: BackgroundsList = {
        background: [],
        leftBound: 0,
        rightBound: 0,
    };

    for (let i = 0; i < BACKGROUND_COUNT; i++) {
        const props: BackgroundProps = {
            layer: [],
        };

        let cloudOffset = 0;

        i == 0 ? (cloudOffset = 50) : (cloudOffset = 0);

        // Since coordinates (0, 0) are centered on the map, I start by creating backgrounds at negative x coordinates to ensure there is always a background, no matter where you start.
        for (let j = -1; j < 4; j++) {
            const posX = j * BACKGROUND_W * BACKGROUND_SCALE;
            props.layer.push(
                k.add([
                    k.sprite(backgroundTime + "-" + `${i + 1}`),
                    k.pos(posX, cloudOffset),
                    k.scale(BACKGROUND_SCALE),
                ])
            );
        }
        backgroundsList.background.push(props);

        // Bounds allow me to create a seamless parallax effect.
        backgroundsList.rightBound = BACKGROUND_W * BACKGROUND_SCALE * 2;
        backgroundsList.leftBound = -BACKGROUND_W * BACKGROUND_SCALE * 2;
    }

    return backgroundsList;
}

/**
 * Updates the background position.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {BackgroundsList} backgrounds The list of background layers.
 * @param {GameObj} player The player game object.
 * @param {number} camY The Y position of the camera.
 * @returns {void}
 */
export function updateBackground(k: KAPLAYCtx, backgrounds: BackgroundsList, player: GameObj, camY: number): void {
    let deltaX = player.pos.x - player.prevPosX;
    let speed = k.dt();

    for (let i = 0; i < BACKGROUND_COUNT; i++) {
        for (let j = 0; j < 5; j++) {
            // The first layer is the clouds (or similar), which will move automatically.
            if (i === 0) {
                backgrounds.background[i].layer[j].pos.x -= CLOUD_SPEED * k.dt();
                if (backgrounds.background[i].layer[j].pos.x < backgrounds.leftBound) {
                    backgrounds.background[i].layer[j].pos.x = backgrounds.rightBound;
                }
            }
            if (deltaX && i != 0) {
                backgrounds.background[i].layer[j].pos.x -= deltaX * speed;
            }
            // Ensure that the background follows the camera; otherwise, we will see the blue background of the canvas.
            backgrounds.background[i].layer[j].pos.y = camY - BACKGROUND_H * 1.5;
        }
        // Increase speed to create a parallax effect.
        speed += 0.3;
    }
}
