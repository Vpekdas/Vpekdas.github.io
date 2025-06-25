import type { KAPLAYCtx } from "kaplay";
import { BACKGROUND_COUNT, SCALE_FACTOR } from "./constants.js";

const backgrounds_early_morning: any = [];
const backgrounds_morning: any = [];
const backgrounds_afternoon: any = [];
const backgrounds_evening: any = [];
const backgrounds_night: any = [];

const backgroundArrays = [
    backgrounds_early_morning,
    backgrounds_morning,
    backgrounds_afternoon,
    backgrounds_evening,
    backgrounds_night,
];

export function createAllBackground(k: KAPLAYCtx) {
    for (let i = 0; i < BACKGROUND_COUNT; i++)
        backgrounds_early_morning.push(createBackground(k, 4, `early-morning-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_morning.push(createBackground(k, 5, `morning-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_afternoon.push(createBackground(k, 5, `afternoon-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_evening.push(createBackground(k, 5, `evening-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_night.push(createBackground(k, 5, `night-${i + 1}`));

    for (let i = 0; i < BACKGROUND_COUNT; i++) {
        backgrounds_early_morning[i].forEach((component: any) => (component.hidden = true));
        backgrounds_morning[i].forEach((component: any) => (component.hidden = true));
        backgrounds_afternoon[i].forEach((component: any) => (component.hidden = true));
        backgrounds_evening[i].forEach((component: any) => (component.hidden = true));
        backgrounds_night[i].forEach((component: any) => (component.hidden = true));
    }
}

export function destroyBackground(k: KAPLAYCtx) {
    backgroundArrays.forEach((backgroundArray) => {
        backgroundArray.forEach((subArray: any) => {
            subArray.forEach((background: any) => {
                if (background) {
                    k.destroy(background);
                }
            });
        });
    });
}

function createBackground(k: KAPLAYCtx, backgroundNumber: number, spriteName: string) {
    const backgroundArray = [];
    const tempSprite = k.add([k.sprite(spriteName)]);
    const spriteWidth = tempSprite.width;

    for (let i = 0; i < backgroundNumber; i++) {
        backgroundArray.push(
            k.add([k.sprite(spriteName), k.pos(i * spriteWidth - spriteWidth, 0), k.scale(SCALE_FACTOR)])
        );
    }
    k.destroy(tempSprite);
    return backgroundArray;
}

function updateBackground(backgroundLayer: any, speed: number, camY: number, playerX: number, prevX: number) {
    let deltaX = playerX - prevX;

    for (let i = 0; i < backgroundLayer.length; i++) {
        if (speed === 0) {
            backgroundLayer[i].pos.y = camY - 100;
            backgroundLayer[i].pos.x -= 2;
            if (backgroundLayer[i].pos.x <= i * backgroundLayer[i].width - backgroundLayer[i].width * 2) {
                backgroundLayer[i].pos.x = i * backgroundLayer[i].width - backgroundLayer[i].width;
            }
        } else {
            if (deltaX) {
                backgroundLayer[i].pos.x -= (deltaX * speed) / 2;
            }
            backgroundLayer[i].pos.y = camY;
        }
    }
}

export function changeBackgroundHour(speed: number, backgroundCamY: number, player: any, currentHour: any) {
    for (let i = 0; i < BACKGROUND_COUNT; i++) {
        if (currentHour >= 3 && currentHour < 6) {
            backgrounds_night[i].forEach((component: any) => (component.hidden = true));
            backgrounds_early_morning[i].forEach((component: any) => (component.hidden = false));
            updateBackground(backgrounds_early_morning[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else if (currentHour >= 6 && currentHour < 12) {
            backgrounds_early_morning[i].forEach((component: any) => (component.hidden = true));
            backgrounds_morning[i].forEach((component: any) => (component.hidden = false));
            updateBackground(backgrounds_morning[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else if (currentHour >= 12 && currentHour < 18) {
            backgrounds_morning[i].forEach((component: any) => (component.hidden = true));
            backgrounds_afternoon[i].forEach((component: any) => (component.hidden = false));
            updateBackground(backgrounds_afternoon[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else if (currentHour >= 18 && currentHour < 21) {
            backgrounds_afternoon[i].forEach((component: any) => (component.hidden = true));
            backgrounds_evening[i].forEach((component: any) => (component.hidden = false));
            updateBackground(backgrounds_evening[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else {
            backgrounds_evening[i].forEach((component: any) => (component.hidden = true));
            backgrounds_night[i].forEach((component: any) => (component.hidden = false));
            updateBackground(backgrounds_night[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        }
        speed += 0.35;
    }
}
