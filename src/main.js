import { k } from "./KaboomCtx.js";
import {
    BACKGROUND_COUNT,
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
    createBackground,
    updateBackground,
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
    handleKeyEvents,
    ensureCanvasFocus,
    createFireworks,
    resetAdventure,
    playMusic,
    regenerateNumber,
} from "./utils.js";

loadAllResources(k);
k.setBackground(k.Color.fromHex("#FFFFFF"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map/map.json")).json();

    const first = k.add([k.sprite("first"), k.pos(0, 0), k.scale(SCALE_FACTOR)]);
    const first2 = k.add([k.sprite("first"), k.pos(-first.width, 0), k.scale(SCALE_FACTOR)]);
    const first3 = k.add([k.sprite("first"), k.pos(first.width, 0), k.scale(SCALE_FACTOR)]);
    const first4 = k.add([k.sprite("first"), k.pos(first.width * 2, 0), k.scale(SCALE_FACTOR)]);

    const first5 = k.add([k.sprite("first"), k.pos(0, first.height * 2), k.scale(SCALE_FACTOR)]);
    const first6 = k.add([k.sprite("first"), k.pos(-first.width, first.height * 2), k.scale(SCALE_FACTOR)]);
    const first7 = k.add([k.sprite("first"), k.pos(first.width, first.height * 2), k.scale(SCALE_FACTOR)]);
    const first8 = k.add([k.sprite("first"), k.pos(first.width * 2, first.height * 2), k.scale(SCALE_FACTOR)]);

    const first9 = k.add([k.sprite("first"), k.pos(0, first.height * 4), k.scale(SCALE_FACTOR)]);
    const first10 = k.add([k.sprite("first"), k.pos(-first.width, first.height * 4), k.scale(SCALE_FACTOR)]);
    const first11 = k.add([k.sprite("first"), k.pos(first.width, first.height * 4), k.scale(SCALE_FACTOR)]);
    const first12 = k.add([k.sprite("first"), k.pos(first.width * 2, first.height * 4), k.scale(SCALE_FACTOR)]);

    first.hidden = true;
    first2.hidden = true;
    first3.hidden = true;
    first4.hidden = true;
    first5.hidden = true;
    first6.hidden = true;
    first7.hidden = true;
    first8.hidden = true;
    first9.hidden = true;
    first10.hidden = true;
    first11.hidden = true;
    first12.hidden = true;

    first.play("idle");
    first2.play("idle");
    first3.play("idle");
    first4.play("idle");

    first5.play("idle");
    first6.play("idle");
    first7.play("idle");
    first8.play("idle");

    first9.play("idle");
    first10.play("idle");
    first11.play("idle");
    first12.play("idle");

    const layers = mapData.layers;
    const interactables = [];
    const backgrounds_early_morning = [];
    const backgrounds_morning = [];
    const backgrounds_afternoon = [];
    const backgrounds_evening = [];
    const backgrounds_night = [];
    const projects = [];
    let steinsGate = false;
    let timeTravelTimeout = false;

    let animationBanner = false;
    let indicators = new Map();
    let timerId = 0;
    let seconds = 0;
    let startX = 0;
    let startY = 0;
    let lightning, lightning2;
    const backgroundArrays = [
        backgrounds_early_morning,
        backgrounds_morning,
        backgrounds_afternoon,
        backgrounds_evening,
        backgrounds_night,
    ];
    const keysPressed = {
        w: false,
        a: false,
        s: false,
        d: false,
        up: false,
        down: false,
        left: false,
        right: false,
    };

    for (let i = 0; i < BACKGROUND_COUNT; i++)
        backgrounds_early_morning.push(createBackground(k, 4, `early-morning-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_morning.push(createBackground(k, 4, `morning-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_afternoon.push(createBackground(k, 4, `afternoon-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_evening.push(createBackground(k, 4, `evening-${i + 1}`));
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds_night.push(createBackground(k, 4, `night-${i + 1}`));

    for (let i = 0; i < BACKGROUND_COUNT; i++) {
        backgrounds_early_morning[i].forEach((component) => (component.hidden = true));
        backgrounds_morning[i].forEach((component) => (component.hidden = true));
        backgrounds_afternoon[i].forEach((component) => (component.hidden = true));
        backgrounds_evening[i].forEach((component) => (component.hidden = true));
        backgrounds_night[i].forEach((component) => (component.hidden = true));
    }

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

    handleKeyEvents("w", true, keysPressed, k, player);
    handleKeyEvents("a", true, keysPressed, k, player);
    handleKeyEvents("s", true, keysPressed, k, player);
    handleKeyEvents("d", true, keysPressed, k, player);
    handleKeyEvents("up", true, keysPressed, k, player);
    handleKeyEvents("down", true, keysPressed, k, player);
    handleKeyEvents("left", true, keysPressed, k, player);
    handleKeyEvents("right", true, keysPressed, k, player);
    handleKeyEvents("escape", true, keysPressed, k, player);

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
                        const phonewawe = k.add([
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
                                    first.hidden = false;
                                    first2.hidden = false;
                                    first3.hidden = false;
                                    first4.hidden = false;
                                    first5.hidden = false;
                                    first6.hidden = false;
                                    first7.hidden = false;
                                    first8.hidden = false;
                                    first9.hidden = false;
                                    first10.hidden = false;
                                    first11.hidden = false;
                                    first12.hidden = false;
                                    const dMailInterface = document.getElementById("d-mail-interface");
                                    if (dMailInterface.style.display === "flex") {
                                        dMailInterface.style.display = "none";
                                        player.isInDialogue = false;
                                        ensureCanvasFocus();
                                    }
                                    alert(
                                        "Congratulations! You have successfully entered the Steins;Gate worldline. The future is now in your hands. El Psy Kongroo!"
                                    );

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
    window.addEventListener("keydown", (event) => {
        const dMailInterface = document.getElementById("d-mail-interface");
        const completingModalOverlay = document.querySelector(".completing-modal-overlay");
        if (event.key === "Escape") {
            if (dMailInterface.style.display === "flex") {
                dMailInterface.style.display = "none";
                player.isInDialogue = false;
                ensureCanvasFocus();
            }
            if (completingModalOverlay.style.display === "flex") {
                completingModalOverlay.style.display = "none";
                player.isInDialogue = false;
                ensureCanvasFocus();
            }
        }
        if (event.key === " ") {
            const background = document.getElementById("background");
            background.style.display = "none";
            ensureCanvasFocus();
        }
        if (event.key === "m") {
            const menu = document.getElementById("hexagon-menu");
            const resetButton = document.querySelector(".clear-storage-button");
            menu.style.display = "flex";
            resetButton.style.display = "inline-flex";
        }

        if (event.key === "e") {
            const menu = document.getElementById("hexagon-menu");
            const resetButton = document.querySelector(".clear-storage-button");

            menu.style.display = "none";
            resetButton.style.display = "none";
        }

        if (event.key === "c") {
            const note = document.querySelector(".note");
            const divergenceMeter = document.querySelector(".glitch-wrapper");

            note.style.display = "none";
            if (divergenceMeter.style.display === "none") {
                divergenceMeter.style.display = "flex";
            }
        }

        if (event.key === "h") {
            const note = document.querySelector(".note");
            const divergenceMeter = document.querySelector(".glitch-wrapper");

            note.style.display = "block";
            divergenceMeter.style.display = "none";
        }

        k.onKeyPress("space", () => {
            if (player.isInDialogue) {
                const dialogueUI = document.getElementById("textbox-container");
                const dialogue = document.getElementById("dialogue");

                dialogueUI.style.display = "none";
                dialogue.innerHTML = "";
                player.isInDialogue = false;
            }
        });
    });

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

    k.onUpdate(() => {
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
        if (!player.isInDialogue) {
            if ((keysPressed.w && keysPressed.a) || (keysPressed.up && keysPressed.left)) {
                player.move(-PLAYER_SPEED / Math.sqrt(2), -PLAYER_SPEED / Math.sqrt(2));
                if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
                    player.play("walk-up");
                    player.direction = "up";
                }
            } else if ((keysPressed.w && keysPressed.d) || (keysPressed.up && keysPressed.right)) {
                player.move(+PLAYER_SPEED / Math.sqrt(2), -PLAYER_SPEED / Math.sqrt(2));
                if (player.curAnim() !== "walk-up" && player.curAnim() !== "walk-side") {
                    player.play("walk-up");
                    player.direction = "up";
                }
            } else if (keysPressed.w || keysPressed.up) {
                player.move(0, -PLAYER_SPEED);
                if (player.curAnim() !== "walk-up") {
                    player.play("walk-up");
                    player.direction = "up";
                }
            }

            if ((keysPressed.s && keysPressed.a) || (keysPressed.down && keysPressed.left)) {
                player.move(-PLAYER_SPEED / Math.sqrt(2), +PLAYER_SPEED / Math.sqrt(2));
                if (player.curAnim() !== "walk-down" && player.curAnim() !== "walk-side") {
                    player.play("walk-down");
                    player.direction = "down";
                }
            } else if ((keysPressed.s && keysPressed.d) || (keysPressed.down && keysPressed.right)) {
                player.move(+PLAYER_SPEED / Math.sqrt(2), +PLAYER_SPEED / Math.sqrt(2));
                if (player.curAnim() !== "walk-down" && player.curAnim() !== "walk-side") {
                    player.play("walk-down");
                    player.direction = "down";
                }
            } else if (keysPressed.s || keysPressed.down) {
                player.move(0, PLAYER_SPEED);
                if (player.curAnim() !== "walk-down") {
                    player.play("walk-down");
                    player.direction = "down";
                }
            }

            if (keysPressed.d || keysPressed.right) {
                player.move(PLAYER_SPEED, 0);
                if (player.curAnim() !== "walk-side" || player.direction !== "right") {
                    player.flipX = false;
                    player.play("walk-side");
                    player.direction = "right";
                }
            }

            if (keysPressed.a || keysPressed.left) {
                player.move(-PLAYER_SPEED, 0);
                if (player.curAnim() !== "walk-side" || player.direction !== "left") {
                    player.flipX = true;
                    player.play("walk-side");
                    player.direction = "left";
                }
            }
        }

        k.camPos(player.pos.x, player.pos.y + 100);

        const backgroundCamY = player.pos.y - 200;
        const currentHour = getCurrentHour();

        let speed = 0;

        for (let i = 0; i < BACKGROUND_COUNT && !steinsGate; i++) {
            if (currentHour >= 3 && currentHour < 6) {
                backgrounds_night[i].forEach((component) => (component.hidden = true));
                backgrounds_early_morning[i].forEach((component) => (component.hidden = false));
                updateBackground(k, backgrounds_early_morning[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
            } else if (currentHour >= 6 && currentHour < 12) {
                backgrounds_early_morning[i].forEach((component) => (component.hidden = true));
                backgrounds_morning[i].forEach((component) => (component.hidden = false));
                updateBackground(k, backgrounds_morning[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
            } else if (currentHour >= 12 && currentHour < 18) {
                backgrounds_morning[i].forEach((component) => (component.hidden = true));
                backgrounds_afternoon[i].forEach((component) => (component.hidden = false));
                updateBackground(k, backgrounds_afternoon[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
            } else if (currentHour >= 18 && currentHour < 21) {
                backgrounds_afternoon[i].forEach((component) => (component.hidden = true));
                backgrounds_evening[i].forEach((component) => (component.hidden = false));
                updateBackground(k, backgrounds_evening[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
            } else {
                backgrounds_evening[i].forEach((component) => (component.hidden = true));
                backgrounds_night[i].forEach((component) => (component.hidden = false));
                updateBackground(k, backgrounds_night[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
            }
            speed += 0.35;
        }

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

    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== "left" || player.isInDialogue) {
            return;
        }
        if (isMousePressed(mouseBtn) && player.isInDialogue) {
            player.isInDialogue = false;
            closeDialogue();
        }

        const worldMousepos = k.toWorld(k.mousePos());
        player.moveTo(worldMousepos, PLAYER_SPEED);

        const mouseAngle = player.pos.angle(worldMousepos);
        const lowerBound = 50;
        const upperBound = 125;

        if (mouseAngle > lowerBound && mouseAngle < upperBound && player.curAnim() !== "walk-up") {
            player.play("walk-up");
            player.direction = "up";
        }
        if (mouseAngle < -lowerBound && mouseAngle > -upperBound && player.curAnim() !== "walk-down") {
            player.play("walk-down");
            player.direction = "down";
        }
        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.curAnim() !== "walk-side") {
                player.play("walk-side");
                player.direction = "left";
            }
        }
        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.curAnim() !== "walk-side") {
                player.play("walk-side");
                player.direction = "right";
            }
        }
    });

    k.onMouseRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }
        player.play("idle-side");
    });
});



// TODO: Template function
// document.addEventListener("DOMContentLoaded", (event) => {
//     const testElement = document.getElementById("test");

//     function stopAtDigit(digit) {
//         const digitHeight = 460;
//         const position = -digit * digitHeight;
//         testElement.style.animation = "none";
//         testElement.style.backgroundPosition = `0px ${position}px`;
//         testElement.style.filter = "none";
//     }

//     setTimeout(() => {
//         stopAtDigit(5);
//     }, 5000);
// });

k.go("main");

// TODO: Refactor the entire codebase for better readability, maintainability, and performance.
// TODO: Change Kaboom.js to Kaplay (a maintained fork of Kaboom.js, which is deprecated)
// TODO: Migrate the codebase from JavaScript to TypeScript for improved type safety and maintainability.
// TODO: Normalize the movement vector for consistent speed in all directions, including diagonals.
// TODO: Add cub3d.
// TODO: Implement a digit scroll animation effect for the divergence meter to enhance visual feedback and user experience.
// TODO: Remove event listeners when they are no longer needed to prevent memory leaks and improve performance. (you can use  { once: true })
// TODO: Reorganize assets in the public folders for better structure, accessibility, and maintainability.
