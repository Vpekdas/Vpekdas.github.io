import { k } from "./KaboomCtx.js";
import { SCALE_FACTOR, HOVER_EVENTS } from "./constants.js";
import { changeBackgroundHour, createAllBackground, createSteinsGateBackground } from "./background.js";
import { handleKeyPressed, movePlayer, handleUIEvent } from "./keys.js";
import { handleMouseEvents } from "./mouse.js";
import { parseAndCreateInteractiveElements } from "./parseMap";
import { loadAllResources } from "./initializeAssets.js";
import { createTile, createHoverEvents } from "./elementFactory.js";
import { updateProgress } from "./progressBar";
import { loadLocalStorage } from "./localStorage.js";
import { showAchievement } from "./achievement.js";
import { clearPopup } from "./menu.js";
import { destroyIndicators } from "./collision.js";
import { countDiscoveredProject, ensureCanvasFocus, getCurrentHour, setCamScale, resetAdventure } from "./utils.js";
import { regenerateNumber } from "./divergenceMeter.js";
import { createFireworks } from "./firework.js";
import { createPlayer } from "./player.js";

loadAllResources(k);

k.setBackground(k.Color.fromHex("#FFFFFF"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map/map.json")).json();
    const layers = mapData.layers;

    createAllBackground(k);
    createSteinsGateBackground(k);

    const currentHour = getCurrentHour();
    const map = k.add([k.sprite("map"), k.pos(0), k.scale(SCALE_FACTOR)]);
    const player = createPlayer(k);

    let backgroundCamY = 0,
        speed = 0;

    const gameElements = {
        interactiveElements: [],
        projects: [],
        indicators: new Map(),
        steinsGate: false,
        chronometer: {
            timerId: 0,
            seconds: 0,
            timeout: false,
        },
        lightningRefs: { lightning: null, lightning2: null },
        startX: 0,
        startY: 0,
    };

    parseAndCreateInteractiveElements(k, player, map, layers, gameElements);

    // Left part of doors.
    createTile(k, "tiles", 2, 114 - 32 * 1, 151);
    createTile(k, "tiles", 2, 114 - 32 * 2, 151);

    createTile(k, "tiles", 23, 114 - 32 * 1, 183);
    createTile(k, "tiles", 23, 114 - 32 * 2, 183);

    // DOOR.
    for (let i = 0; i < 3; i++) {
        createTile(k, "tiles", 153 + i, 48 + 6 + 32 * i, 150, 3);
        createTile(k, "tiles", 174 + i, 48 + +6 + 32 * i, 182, 0);
    }

    loadLocalStorage(gameElements.projects);
    updateProgress(gameElements.projects, false);
    showAchievement(gameElements.projects);

    setTimeout(() => {
        const note = document.querySelector(".note");
        note.style.display = "none";
        regenerateNumber(gameElements.projects);
    }, 4000);

    clearPopup();

    // Adding a second destroy ensures discovered projects from previous refreshes are properly removed.
    destroyIndicators(k, gameElements.indicators, gameElements.projects);

    if (countDiscoveredProject(gameElements.projects) === gameElements.projects.length) {
        createFireworks(20);
        document.querySelector(".completing-modal-overlay").style.display = "flex";
    }

    window.addEventListener("DOMContentLoaded", updateProgress);

    const playButton = document.getElementById("play-button");

    playButton.addEventListener("click", () => {
        const background = document.getElementById("background");
        background.style.display = "none";
        ensureCanvasFocus();
    });

    resetAdventure();

    setCamScale(k);

    k.onResize(() => {
        setCamScale(k);
    });

    handleUIEvent(player);

    k.onUpdate(() => {
        handleKeyPressed(k, player);

        movePlayer(player);

        if (gameElements.chronometer.seconds >= 15) {
            clearInterval(gameElements.chronometer.timerId);
            gameElements.chronometer.timerId = 0;
            gameElements.chronometer.seconds = 0;
            gameElements.chronometer.timeout = false;
            if (
                countDiscoveredProject(gameElements.projects) === gameElements.projects.length &&
                !gameElements.chronometer.timeout
            ) {
                k.destroy(gameElements.lightningRefs.lightning);
                k.destroy(gameElements.lightningRefs.lightning2);
            }
        }

        k.camPos(player.pos.x, player.pos.y + 100);

        backgroundCamY = player.pos.y - 200;

        changeBackgroundHour(speed, gameElements.steinsGate, backgroundCamY, player, currentHour);

        player.prevPosX = player.pos.x;
        player.prevPosY = player.pos.y;

        blinkInteractiveElements(k, gameElements.interactiveElements);
    });

    HOVER_EVENTS.forEach((event) => {
        createHoverEvents(k, event);
    });

    handleMouseEvents(k, player);
});

k.go("main");

function blinkInteractiveElements(k, interactiveElements) {
    for (const element of interactiveElements) {
        element.blink = Math.floor(k.time() / 0.5) % 2 === 0;

        if (element.blink) {
            element.originalSprite.opacity = 0.75;
        } else {
            element.originalSprite.opacity = 1;
        }
    }
}
