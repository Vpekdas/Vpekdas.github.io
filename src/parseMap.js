import {
    OFFSET_X,
    OFFSET_Y,
    SCALE_FACTOR,
    DEF_SCALE_IND,
    INDICATOR_OFFSET,
    FURNITURES,
    BOOKS,
    PROJECT_DESCRIPTIONS,
    OkabeDialogue,
    KurisuDialogue,
} from "./constants.js";

import { displayDialogue } from "./dialogue.js";

import { getIndicatorOffset, createIndicator, createInteractable } from "./elementFactory.js";
import {
    showAchievementIcon,
    showAchievementTitle,
    showAchievementDescription,
    showAchievementNotification,
    showBannerTemporarily,
    growBanner,
    showAchievement,
} from "./achievement.js";
import { countDiscoveredProject } from "./utils.js";
import { regenerateNumber } from "./divergenceMeter.js";
import { ensureCanvasFocus } from "./utils";
import { saveToLocalStorage } from "./localStorage.js";
import { updateProgress } from "./progressBar.js";
import { createFireworks } from "./firework.js";
import { playMusic } from "./music.js";
import { displaySteinsGateBackground, destroyBackground } from "./background.js";

let animationBanner = false;
let startX = 0;
let startY = 0;

export function parseAndCreateInteractables(
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
) {
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
                    generateInteractable(k, boundary, interactables, indicators, projects);

                    player.onCollide(boundary.name, () => {
                        if (boundary.name === "PhoneWawe") {
                            chronometer.timeout = true;

                            if (!chronometer.timerId) {
                                chronometer.seconds = 0;
                                chronometer.timerId = setInterval(() => {
                                    chronometer.seconds++;
                                }, 1000);
                            }

                            if (countDiscoveredProject(projects) === projects.length && chronometer.timeout) {
                                lightningRefs.lightning = k.add([
                                    k.sprite("lightning"),
                                    k.pos(boundary.x * SCALE_FACTOR, (boundary.y + 6) * SCALE_FACTOR),
                                    k.scale(1),
                                ]);
                                lightningRefs.lightning.play("shock");

                                lightningRefs.lightning2 = k.add([
                                    k.sprite("lightning2"),
                                    k.pos(boundary.x * SCALE_FACTOR, (boundary.y + 18) * SCALE_FACTOR),
                                    k.scale(1),
                                ]);
                                lightningRefs.lightning2.play("shock");
                            }

                            return;
                        }

                        player.isInDialogue = true;

                        if (boundary.name === "SG-001") {
                            if (!timeout || countDiscoveredProject(projects) != projects.length || steinsGate) {
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
                            const discovered = countDiscoveredProject(projects);
                            const projectIndex = projects.findIndex((project) => project.name === boundary.name);
                            if (projectIndex != -1 && projects[projectIndex].discovered) {
                                return;
                            }
                            saveToLocalStorage(boundary.name);
                            setProjectAsDiscovered(projects, boundary);
                            displayAchievement(projects, boundary);
                            destroyIndicators(k, indicators, projects);
                            regenerateNumber(projects);

                            if (discovered <= projects.length) {
                                updateProgress(projects, discovered);
                            }

                            animationBanner = true;
                            setTimeout(() => {
                                animationBanner = false;
                            }, 7000);

                            if (countDiscoveredProject(projects) === projects.length) {
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
            generatePlayerPosition(k, layer, player, map);
        }
    }
}

function generateInteractable(k, boundary, interactables, indicators, projects) {
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
        const getNextLineIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

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
        const pipexIndicatorOffsets = getIndicatorOffset(boundary, modified_DEF_SCALE_IND, INDICATOR_OFFSET);

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
        const libftIndicatorOffsets = getIndicatorOffset(boundary, modified_DEF_SCALE_IND, INDICATOR_OFFSET);

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
        const PhilosophersIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
        PhilosophersIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            PhilosophersIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
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
}

function generatePlayerPosition(k, layer, player, map) {
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

function displayAchievement(projects, boundary) {
    showAchievement(projects);
    showBannerTemporarily(7000);
    showAchievementNotification(2000);
    showAchievementIcon(3000, PROJECT_DESCRIPTIONS[boundary.name].icon);
    showAchievementTitle(3000, PROJECT_DESCRIPTIONS[boundary.name].title);
    showAchievementDescription(3000, PROJECT_DESCRIPTIONS[boundary.name].achievement);
    growBanner();
}

function addProject(boundary, projects) {
    projects.push({
        name: boundary.name,
        discovered: false,
    });
}

function setProjectAsDiscovered(projects, boundary) {
    for (let i = 0; i < projects.length; i++) {
        if (boundary.name === projects[i].name && projects[i].discovered != true) {
            projects[i].discovered = true;
        }
    }
}

export function destroyIndicators(k, indicators, projects) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered === true) {
            indicators[projects[i].name].forEach((indicator) => {
                k.destroy(indicator);
            });
        }
    }
}
