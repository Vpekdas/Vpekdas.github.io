import { k } from "./KaboomCtx.js";
import { PLAYER_SPEED, SCALE_FACTOR, HOVER_EVENTS } from "./constants.js";
import { changeBackgroundHour, createAllBackground, createSteinsGateBackground } from "./background.js";
import { handleKeyPressed, movePlayer, handleUIEvent } from "./keys.js";
import { handleMouseEvents } from "./mouse.js";
import { parseAndCreateInteractables } from "./parseMap.js";
import { loadAllResources } from "./initializeAssets.js";
import { createTile, createHoverEvents } from "./elementFactory.js";
import { updateProgress } from "./progressBar";
import { loadLocalStorage } from "./localStorage.js";
import { showAchievement } from "./achievement.js";
import { clearPopup } from "./menu.js";
import { destroyIndicators } from "./parseMap.js";
import { countDiscoveredProject } from "./utils.js";
import { regenerateNumber } from "./divergenceMeter.js";
import { ensureCanvasFocus } from "./utils";
import { createFireworks } from "./firework.js";

loadAllResources(k);

k.setBackground(k.Color.fromHex("#FFFFFF"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map/map.json")).json();
    const layers = mapData.layers;

    createAllBackground(k);
    createSteinsGateBackground(k);

    const currentHour = getCurrentHour();

    const interactables = [];
    const projects = [];

    let indicators = new Map();
    let steinsGate = false;

    let speed = 0;
    let lightning, lightning2;
    const lightningRefs = { lightning, lightning2 };

    const chronometer = [
        {
            timerId: 0,
            seconds: 0,
            timeout: false,
        },
    ];

    const map = k.add([k.sprite("map"), k.pos(0), k.scale(SCALE_FACTOR)]);
    const player = k.add([
        k.sprite("player", { anim: "idle-down" }),
        k.area({
            shape: new k.Rect(k.vec2(0, 3), 10, 16),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.z(1),
        k.scale(SCALE_FACTOR),
        {
            speed: PLAYER_SPEED,
            direction: "down",
            isInDialogue: false,
            prevPosX: 0,
            prevPosY: 0,
        },
        "player",
    ]);

    parseAndCreateInteractables(
        k,
        player,
        map,
        interactables,
        projects,
        indicators,
        layers,
        steinsGate,
        chronometer,
        lightningRefs
    );

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

    loadLocalStorage(projects);
    updateProgress(projects, false);
    showAchievement(projects);

    setTimeout(() => {
        const note = document.querySelector(".note");
        note.style.display = "none";
        regenerateNumber(projects);
    }, 4000);

    clearPopup();

    // Adding a second destroy ensures discovered projects from previous refreshes are properly removed.
    destroyIndicators(k, indicators, projects);

    if (countDiscoveredProject(projects) === projects.length) {
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

        if (chronometer.seconds >= 15) {
            clearInterval(chronometer.timerId);
            chronometer.timerId = 0;
            chronometer.seconds = 0;
            chronometer.timeout = false;
            if (countDiscoveredProject(projects) === projects.length && !chronometer.timeout) {
                k.destroy(lightningRefs.lightning);
                k.destroy(lightningRefs.lightning2);
            }
        }

        k.camPos(player.pos.x, player.pos.y + 100);

        const backgroundCamY = player.pos.y - 200;

        changeBackgroundHour(speed, steinsGate, backgroundCamY, player, currentHour);

        player.prevPosX = player.pos.x;
        player.prevPosY = player.pos.y;

        blinkInteractables(k, interactables);
    });

    HOVER_EVENTS.forEach((event) => {
        createHoverEvents(k, event);
    });

    handleMouseEvents(k, player);
});

k.go("main");

function blinkInteractables(k, interactables) {
    for (const interactable of interactables) {
        interactable.blink = Math.floor(k.time() / 0.5) % 2 === 0;

        if (interactable.blink) {
            interactable.originalSprite.opacity = 0.75;
        } else {
            interactable.originalSprite.opacity = 1;
        }
    }
}

function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
        return;
    }

    k.camScale(k.vec2(1.5));
}

function resetAdventure() {
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}
