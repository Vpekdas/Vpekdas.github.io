import { k } from "./KaboomCtx.js";
import { SCALE_FACTOR, HOVER_EVENTS, DOOR_OFFSET } from "./constants.js";
import { changeBackgroundHour, createAllBackground } from "./background.js";
import { handleKeyPressed, movePlayer, handleUIEvent } from "./keys.js";
import { handleMouseEvents } from "./mouse.js";
import { parseLayers } from "./parseMap";
import { loadAllResources } from "./initializeAssets.js";
import { createTile, createHoverEvents } from "./elementFactory.js";
import { updateProgress } from "./progressBar";
import { loadLocalStorage } from "./localStorage.js";
import { generateDiscoveredAchievements } from "./achievement.js";
import { clearPopup } from "./menu.js";
import { destroyIndicators } from "./collision.js";
import { countDiscoveredProject, ensureCanvasFocus, getCurrentHour, setCamScale, resetAdventure } from "./utils.js";
import { createFireworks } from "./firework.js";
import { createPlayer } from "./player.js";

loadAllResources(k);

k.setBackground(k.Color.fromHex("#FFFFFF"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map/map.json")).json();
    const layers = mapData.layers;

    createAllBackground(k);

    const currentHour = getCurrentHour();
    const map = k.add([k.sprite("map"), k.pos(0), k.scale(SCALE_FACTOR)]);
    const player = createPlayer(k);

    let backgroundCamY = 0,
        backgroundSpeed = 0;

    const gameElements = {
        interactiveElements: [],
        projects: [],
        indicators: new Map(),
        startX: 0,
        startY: 0,
    };

    parseLayers(k, player, map, layers, gameElements);

    for (let i = 0; i < 3; i++) {
        createTile(k, "tiles", 153 + i, 48 + 6 + DOOR_OFFSET * i, 150, 3);
        createTile(k, "tiles", 174 + i, 48 + 6 + DOOR_OFFSET * i, 182, 0);
    }

    loadLocalStorage(gameElements.projects);
    updateProgress(gameElements.projects, false);
    generateDiscoveredAchievements(gameElements.projects);

    setTimeout(() => {
        const note = document.querySelector(".note");
        note.style.display = "none";
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

        k.camPos(player.pos.x, player.pos.y + 100);

        backgroundCamY = player.pos.y - 200;

        changeBackgroundHour(backgroundSpeed, backgroundCamY, player, currentHour);

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
