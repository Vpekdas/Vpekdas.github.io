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
    countAchievemenDiscovered,
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

    let startX = 0;
    let startY = 0;

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

    createTile(k, "tiles", 2, 114 - 32 * 1, 151);
    createTile(k, "tiles", 2, 114 - 32 * 2, 151);

    createTile(k, "tiles", 23, 114 - 32 * 1, 183);
    createTile(k, "tiles", 23, 114 - 32 * 2, 183);

    // DOOR
    for (let i = 0; i < 3; i++) {
        createTile(k, "tiles", 153 + i, 48 + 6 + 32 * i, 150, 3);
        createTile(k, "tiles", 174 + i, 48 + +6 + 32 * i, 182, 0);
    }

    for (const layer of layers) {
        if (layer.name === "boundaries") {
            for (const boundary of layer.objects) {
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
                    }),
                    k.body({ isStatic: true }),
                    k.pos(boundary.x + OFFSET_X, boundary.y + OFFSET_Y),
                    boundary.name,
                ]);

                if (boundary.name) {
                    if (boundary.name === "so_long") {
                        const soLongIndicators = [];
                        const soLongIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

                        soLongIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            soLongIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });

                        interactables.push(createInteractable(k, "tiles", boundary, 82, 0, 0));
                        addProject(boundary, projects);
                        indicators[boundary.name] = soLongIndicators;
                    }
                    if (boundary.name === "ft_printf") {
                        const ftPrintfIndicators = [];
                        const ftPrintfIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

                        ftPrintfIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            ftPrintfIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });

                        const interactable = createInteractable(k, "tiles", boundary, 13, 0, 0);
                        const interactable2 = createInteractable(k, "tiles", boundary, 14, 32, 0);

                        interactables.push(interactable);
                        interactables.push(interactable2);
                        addProject(boundary, projects);
                        indicators[boundary.name] = ftPrintfIndicators;
                    }
                    if (boundary.name == "get_next_line") {
                        const getNextLineIndicators = [];
                        const getNextLineIndicatorOffsets = getIndicatorOffset(
                            boundary,
                            DEF_SCALE_IND,
                            INDICATOR_OFFSET
                        );

                        getNextLineIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            getNextLineIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });

                        interactables.push(createInteractable(k, "tiles", boundary, 124, 0, 0));
                        addProject(boundary, projects);
                        indicators[boundary.name] = getNextLineIndicators;
                    }
                    if (boundary.name == "pipex") {
                        const pipexIndicators = [];
                        const modified_DEF_SCALE_IND = DEF_SCALE_IND.map((indicator) => {
                            if (indicator.name === "topLeft" || indicator.name === "topRight") {
                                return {
                                    ...indicator,
                                    y: indicator.y * 2,
                                };
                            }
                            return indicator;
                        });
                        const pipexIndicatorOffsets = getIndicatorOffset(
                            boundary,
                            modified_DEF_SCALE_IND,
                            INDICATOR_OFFSET
                        );

                        pipexIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            pipexIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });

                        interactables.push(createInteractable(k, "pipe", boundary, 0, 0, -8));
                        addProject(boundary, projects);
                        indicators[boundary.name] = pipexIndicators;
                    }
                    if (boundary.name == "libft") {
                        const libftIndicators = [];
                        const modified_DEF_SCALE_IND = DEF_SCALE_IND.map((indicator) => {
                            if (indicator.name === "bottomLeft" || indicator.name === "bottomRight") {
                                return {
                                    ...indicator,
                                    y: indicator.y * -0.5,
                                };
                            }
                            return indicator;
                        });
                        const libftIndicatorOffsets = getIndicatorOffset(
                            boundary,
                            modified_DEF_SCALE_IND,
                            INDICATOR_OFFSET
                        );

                        libftIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            libftIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });

                        FURNITURES.forEach(({ frame, x, y }) => {
                            interactables.push(createInteractable(k, "furniture", boundary, frame, x, y));
                        });
                        addProject(boundary, projects);
                        indicators[boundary.name] = libftIndicators;
                    }
                    if (boundary.name === "push_swap") {
                        const pushSwapIndicators = [];
                        const pushSwapIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

                        pushSwapIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            pushSwapIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });

                        BOOKS.forEach(({ type, x, y }) => {
                            interactables.push(createInteractable(k, type, boundary, 0, x, y));
                        });
                        addProject(boundary, projects);
                        indicators[boundary.name] = pushSwapIndicators;
                    }
                    if (boundary.name === "philosophers") {
                        const PhilosophersIndicators = [];
                        const PhilosophersIndicatorOffsets = getIndicatorOffset(
                            boundary,
                            DEF_SCALE_IND,
                            INDICATOR_OFFSET
                        );
                        PhilosophersIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            PhilosophersIndicators.push(
                                createIndicator(boundary.x + dx, boundary.y + dy, direction, k)
                            );
                        });
                        interactables.push(createInteractable(k, "tiles", boundary, 159, -10, -13));
                        interactables.push(createInteractable(k, "tiles", boundary, 160, 22, -13));
                        interactables.push(createInteractable(k, "tiles", boundary, 180, -10, 19));
                        interactables.push(createInteractable(k, "tiles", boundary, 181, 22, 19));
                        createInteractable(k, "tiles", boundary, 163, -4, 0);
                        createInteractable(k, "tiles", boundary, 166, 4, -12);
                        addProject(boundary, projects);
                        indicators[boundary.name] = PhilosophersIndicators;
                    }
                    if (boundary.name === "minishell") {
                        const minishellIndicators = [];
                        const minishellIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
                        minishellIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            minishellIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
                        });
                        interactables.push(createInteractable(k, "tiles", boundary, 48, -18, 1));
                        interactables.push(createInteractable(k, "tiles", boundary, 49, 14, 1));
                        interactables.push(createInteractable(k, "tiles", boundary, 50, 46, 1));
                        addProject(boundary, projects);
                        indicators[boundary.name] = minishellIndicators;
                    }
                    if (boundary.name === "PhoneWawe") {
                        const phonewawe = k.add([
                            k.sprite("phonewawe"),
                            k.pos((boundary.x + 22) * SCALE_FACTOR, (boundary.y + 32) * SCALE_FACTOR),
                            k.scale(0.1),
                        ]);
                    }
                    if (boundary.name === "SG-001") {
                        const sg001 = k.add([
                            k.sprite("sg-001"),
                            k.pos((boundary.x + 24) * SCALE_FACTOR, (boundary.y + 18) * SCALE_FACTOR),
                            k.scale(0.1),
                        ]);
                    }
                    if (boundary.name === "Okabe") {
                        const okabe = k.add([
                            k.sprite("okabe"),
                            k.pos((boundary.x + 16) * SCALE_FACTOR, (boundary.y + 12) * SCALE_FACTOR),
                            k.scale(0.7),
                        ]);
                        okabe.play("idle");
                    }
                    if (boundary.name === "Kurisu") {
                        const kurisu = k.add([
                            k.sprite("kurisu"),
                            k.pos((boundary.x + 22) * SCALE_FACTOR, (boundary.y + 12) * SCALE_FACTOR),
                            k.scale(0.7),
                        ]);
                        kurisu.play("idle");
                    }

                    player.onCollide(boundary.name, () => {
                        if (boundary.name === "PhoneWawe") {
                            timeTravelTimeout = true;
                            if (!timerId) {
                                timerId = setInterval(() => {
                                    seconds++;
                                }, 1000);
                            }
                            if (countAchievemenDiscovered(projects) === projects.length && timeTravelTimeout) {
                                lightning = k.add([
                                    k.sprite("lightning"),
                                    k.pos(boundary.x * SCALE_FACTOR, (boundary.y + 6) * SCALE_FACTOR),
                                    k.scale(1),
                                ]);
                                lightning.play("shock");

                                lightning2 = k.add([
                                    k.sprite("lightning2"),
                                    k.pos(boundary.x * SCALE_FACTOR, (boundary.y + 18) * SCALE_FACTOR),
                                    k.scale(1),
                                ]);
                                lightning2.play("shock");
                            }
                            return;
                        }
                        player.isInDialogue = true;
                        if (boundary.name === "SG-001") {
                            if (
                                !timeTravelTimeout ||
                                countAchievemenDiscovered(projects) != projects.length ||
                                steinsGate
                            ) {
                                player.isInDialogue = false;
                                return;
                            }
                            const dMailInterface = document.getElementById("d-mail-interface");
                            dMailInterface.style.display = "flex";
                            document.getElementById("send-d-mail").addEventListener("click", function () {
                                const message = document.getElementById("d-mail-message").value.trim();
                                const correctMessage = "42";

                                if (message === correctMessage) {
                                    playMusic();
                                    player.pos.x = 2300;
                                    player.pos.y = 350;
                                    steinsGate = true;
                                    displaySteinsGateBackground();

                                    const dMailInterface = document.getElementById("d-mail-interface");
                                    if (dMailInterface.style.display === "flex") {
                                        dMailInterface.style.display = "none";
                                        player.isInDialogue = false;
                                        ensureCanvasFocus();
                                    }
                                    alert(
                                        "Congratulations! You have successfully entered the Steins;Gate worldline. The future is now in your hands. El Psy Kongroo!"
                                    );

                                    destroyBackground(k);
                                }
                            });
                            return;
                        }

                        if (boundary.name === "Okabe") {
                            displayDialogue(OkabeDialogue, () => (player.isInDialogue = false));
                            return;
                        }

                        if (boundary.name === "Kurisu") {
                            displayDialogue(KurisuDialogue, () => (player.isInDialogue = false));
                            return;
                        }
                        if (boundary.name === "ibn-5100") {
                            player.pos.x = startX;
                            player.pos.y = startY;
                            player.isInDialogue = false;
                            return;
                        }

                        displayDialogue(PROJECT_DESCRIPTIONS[boundary.name].story, () => (player.isInDialogue = false));

                        if (animationBanner === false) {
                            const discovered = countAchievemenDiscovered(projects);
                            const projectIndex = projects.findIndex((project) => project.name === boundary.name);
                            if (projectIndex != -1 && projects[projectIndex].discovered) {
                                return;
                            }
                            saveToLocalStorage(boundary.name);
                            setProjectAsDiscovered(projects, boundary);
                            showAchievement(projects);
                            showBannerTemporarily(7000);
                            showAchievementNotification(2000);
                            showAchievementIcon(3000, PROJECT_DESCRIPTIONS[boundary.name].icon);
                            showAchievementTitle(3000, PROJECT_DESCRIPTIONS[boundary.name].title);
                            showAchievementDescription(3000, PROJECT_DESCRIPTIONS[boundary.name].achievement);
                            growBanner();
                            destroyIndicators(k, indicators, projects);
                            regenerateNumber(projects);

                            if (discovered <= projects.length) {
                                updateProgress(projects, discovered);
                            }

                            animationBanner = true;
                            setTimeout(() => {
                                animationBanner = false;
                            }, 7000);

                            if (countAchievemenDiscovered(projects) === projects.length) {
                                createFireworks(20);
                                document.querySelector(".completing-modal-overlay").style.display = "flex";
                            }
                        }
                    });
                }
            }
            continue;
        }

        if (layer.name === "spawnpoint") {
            for (const entity of layer.objects) {
                if (entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x + OFFSET_X) * SCALE_FACTOR,
                        (map.pos.y + entity.y + OFFSET_Y) * SCALE_FACTOR
                    );
                    startX = (map.pos.x + entity.x + OFFSET_X) * SCALE_FACTOR;
                    startY = (map.pos.y + entity.y + OFFSET_Y) * SCALE_FACTOR;
                    player.prevPosX = player.pos.x;
                    player.prevPosY = player.pos.y;
                    continue;
                }
            }
        }
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
    if (countAchievemenDiscovered(projects) === projects.length) {
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
        if (seconds >= 15) {
            clearInterval(timerId);
            timerId = 0;
            seconds = 0;
            timeTravelTimeout = false;
            if (countAchievemenDiscovered(projects) === projects.length && !timeTravelTimeout) {
                k.destroy(lightning);
                k.destroy(lightning2);
            }
        }
        player.prevPosX = player.pos.x;
        player.prevPosY = player.pos.y;

        k.camPos(player.pos.x, player.pos.y + 100);

        const backgroundCamY = player.pos.y - 200;
        const currentHour = getCurrentHour();

        changeBackgroundHour(steinsGate, backgroundCamY, player, currentHour);

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
