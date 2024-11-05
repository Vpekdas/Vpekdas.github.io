import { k } from "./KaboomCtx.js";
import {
    OFFSET_X,
    OFFSET_Y,
    PLAYER_SPEED,
    SCALE_FACTOR,
    DEF_SCALE_IND,
    INDICATOR_OFFSET,
    FURNITURES,
    BOOKS,
    HOVER_EVENTS,
    PROJECT_DESCRIPTIONS,
    OkabeDialogue,
    KurisuDialogue,
} from "./constants.js";
import {
    createHoverEvents,
    createInteractable,
    displayDialogue,
    loadAllResources,
    setCamScale,
    createIndicator,
    createTile,
    getIndicatorOffset,
    updateProgress,
    addProject,
    setProjectAsDiscovered,
    countAchievementDiscovered,
    growBanner,
    showBannerTemporarily,
    showAchievementTitle,
    showAchievementDescription,
    showAchievementIcon,
    showAchievementNotification,
    closeDialogue,
    showAchievement,
    saveToLocalStorage,
    loadLocalStorage,
    getCurrentHour,
    clearPopup,
    destroyIndicators,
    ensureCanvasFocus,
    createFireworks,
    resetAdventure,
    playMusic,
    regenerateNumber,
} from "./utils.js";
import {
    changeBackgroundHour,
    destroyBackground,
    createAllBackground,
    createSteinsGateBackground,
    displaySteinsGateBackground,
} from "./background.js";
import { handleKeyPressed, movePlayer, handleUIEvent } from "./keys.js";
import { handleMouseEvents } from "./mouse.js";
import { parseAndCreateInteractables } from "./parseMap.js";

loadAllResources(k);
k.setBackground(k.Color.fromHex("#FFFFFF"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map/map.json")).json();
    createAllBackground(k);
    createSteinsGateBackground(k);

    const layers = mapData.layers;

    const interactables = [];
    const projects = [];
    let indicators = new Map();

    let steinsGate = false;
    let timeTravelTimeout = false;
    let animationBanner = false;

    let timerId = 0;
    let seconds = 0;

    let lightning, lightning2;

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

    parseAndCreateInteractables(k, player, map, interactables, projects, indicators, layers);

    createTile(k, "tiles", 2, 114 - 32 * 1, 151);
    createTile(k, "tiles", 2, 114 - 32 * 2, 151);

    createTile(k, "tiles", 23, 114 - 32 * 1, 183);
    createTile(k, "tiles", 23, 114 - 32 * 2, 183);

    // DOOR
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
    if (countAchievementDiscovered(projects) === projects.length) {
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

    let speed = 0;
    handleUIEvent(player);
    k.onUpdate(() => {
        handleKeyPressed(k, player);
        movePlayer(player);
        if (seconds >= 15) {
            clearInterval(timerId);
            timerId = 0;
            seconds = 0;
            timeTravelTimeout = false;
            if (countAchievementDiscovered(projects) === projects.length && !timeTravelTimeout) {
                k.destroy(lightning);
                k.destroy(lightning2);
            }
        }

        k.camPos(player.pos.x, player.pos.y + 100);

        const backgroundCamY = player.pos.y - 200;
        const currentHour = getCurrentHour();

        changeBackgroundHour(speed, steinsGate, backgroundCamY, player, currentHour);

        player.prevPosX = player.pos.x;
        player.prevPosY = player.pos.y;

        for (const interactable of interactables) {
            interactable.blink = Math.floor(k.time() / 0.5) % 2 === 0;

            if (interactable.blink) {
                interactable.originalSprite.opacity = 0.75;
            } else {
                interactable.originalSprite.opacity = 1;
            }
        }
    });

    HOVER_EVENTS.forEach((event) => {
        createHoverEvents(k, event);
    });

    handleMouseEvents(k, player);
});

k.go("main");

// TODO: Refactor the entire codebase for better readability, maintainability, and performance.
// TODO: Change Kaboom.js to Kaplay (a maintained fork of Kaboom.js, which is deprecated)
// TODO: Normalize the movement vector for consistent speed in all directions, including diagonals.
// TODO: Add cub3d.
// TODO: Implement a digit scroll animation effect for the divergence meter to enhance visual feedback and user experience.
// TODO: Remove event listeners when they are no longer needed to prevent memory leaks and improve performance. (you can use  { once: true })
// TODO: Reorganize assets in the public folders for better structure, accessibility, and maintainability.
// TODO: Store the divergence meter value in local storage to persist the state across sessions.
