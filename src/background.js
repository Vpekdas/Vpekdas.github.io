import { BACKGROUND_COUNT, SCALE_FACTOR } from "./constants.js";

const steinsGateBackgrounds = [];
const steinsGateTileName = "steins-gate-background";

function createSteinsGateTile(k, x, y) {
    return k.add([k.sprite(steinsGateTileName), k.pos(x, y), k.scale(SCALE_FACTOR)]);
}

export function createSteinsGateBackground(k) {
    const steinsGateBackground = createSteinsGateTile(k, 0, 0);
    const steinsGateWidth = steinsGateBackground.width;
    const steinsGateHeight = steinsGateBackground.height;
    k.destroy(steinsGateBackground);

    const rows = 3;
    const cols = 2;

    for (let row = 0; row < rows; row++) {
        for (let col = -1; col <= cols; col++) {
            const x = col * steinsGateWidth;
            const y = row * steinsGateHeight * 2;
            steinsGateBackgrounds.push(createSteinsGateTile(k, x, y));
        }
    }
    steinsGateBackgrounds.forEach((background) => {
        background.hidden = true;
        background.play("opening");
    });
}

export function displaySteinsGateBackground() {
    steinsGateBackgrounds.forEach((background) => {
        background.hidden = false;
    });
}

const backgrounds_early_morning = [];
const backgrounds_morning = [];
const backgrounds_afternoon = [];
const backgrounds_evening = [];
const backgrounds_night = [];

const backgroundArrays = [
    backgrounds_early_morning,
    backgrounds_morning,
    backgrounds_afternoon,
    backgrounds_evening,
    backgrounds_night,
];

export function createAllBackground(k) {
    for (let i = 0; i < BACKGROUND_COUNT; i++)
        backgrounds_early_morning.push(createBackground(k, 4, `early-morning-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_morning.push(createBackground(k, 5, `morning-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_afternoon.push(createBackground(k, 5, `afternoon-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_evening.push(createBackground(k, 5, `evening-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_night.push(createBackground(k, 5, `night-${i + 1}`));

    for (let i = 0; i < BACKGROUND_COUNT; i++) {
        backgrounds_early_morning[i].forEach((component) => (component.hidden = true));
        backgrounds_morning[i].forEach((component) => (component.hidden = true));
        backgrounds_afternoon[i].forEach((component) => (component.hidden = true));
        backgrounds_evening[i].forEach((component) => (component.hidden = true));
        backgrounds_night[i].forEach((component) => (component.hidden = true));
    }
}

export function destroyBackground(k) {
    backgroundArrays.forEach((backgroundArray) => {
        backgroundArray.forEach((subArray) => {
            subArray.forEach((background) => {
                if (background) {
                    k.destroy(background);
                }
            });
        });
    });
}

function createBackground(k, backgroundNumber, spriteName) {
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

function updateBackground(backgroundLayer, speed, camY, playerX, prevX) {
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

export function changeBackgroundHour(speed, steinsGate, backgroundCamY, player, currentHour) {
    for (let i = 0; i < BACKGROUND_COUNT && !steinsGate; i++) {
        if (currentHour >= 3 && currentHour < 6) {
            backgrounds_night[i].forEach((component) => (component.hidden = true));
            backgrounds_early_morning[i].forEach((component) => (component.hidden = false));
            updateBackground(backgrounds_early_morning[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else if (currentHour >= 6 && currentHour < 12) {
            backgrounds_early_morning[i].forEach((component) => (component.hidden = true));
            backgrounds_morning[i].forEach((component) => (component.hidden = false));
            updateBackground(backgrounds_morning[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else if (currentHour >= 12 && currentHour < 18) {
            backgrounds_morning[i].forEach((component) => (component.hidden = true));
            backgrounds_afternoon[i].forEach((component) => (component.hidden = false));
            updateBackground(backgrounds_afternoon[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else if (currentHour >= 18 && currentHour < 21) {
            backgrounds_afternoon[i].forEach((component) => (component.hidden = true));
            backgrounds_evening[i].forEach((component) => (component.hidden = false));
            updateBackground(backgrounds_evening[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        } else {
            backgrounds_evening[i].forEach((component) => (component.hidden = true));
            backgrounds_night[i].forEach((component) => (component.hidden = false));
            updateBackground(backgrounds_night[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
        }
        speed += 0.35;
    }
}
