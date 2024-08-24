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
    aboutMe,
    mission,
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
} from "./utils.js";

k.scene("menu", async () => {
    const mapData = await (await fetch("./map/map.json")).json();
    const note = document.querySelector(".note");
    const progresBarDone = document.querySelector(".progress-done ");
    const progresBar = document.querySelector(".progress");
    const achievement = document.getElementById("iconContainer");

    note.style.display = "none";
    progresBarDone.style.display = "none";
    progresBar.style.display = "none";
    achievement.style.display = "none";

    const aboutMeObj = k.add([k.sprite("msg"), k.pos(0, 0), k.scale(SCALE_FACTOR)]);
    const missionObj = k.add([k.sprite("msg2"), k.pos(0, 0), k.scale(SCALE_FACTOR)]);
    const socialsObj = k.add([k.sprite("msg3"), k.pos(0, 0), k.scale(1)]);

    const githubLogo = k.add([
        k.sprite("github-logo"),
        k.pos(k.width() / 2 - socialsObj.width / 3 - 10, k.height() / 3),
        k.area(),
    ]);

    const discordLogo = k.add([
        k.sprite("discord-logo"),
        k.pos(k.width() / 2 - socialsObj.width / 3, k.height() / 2.2),
        k.scale(0.3),
        k.area(),
    ]);

    const linkedinLogo = k.add([
        k.sprite("linkedin-logo"),
        k.pos(k.width() / 2 - socialsObj.width / 3, k.height() / 1.8),
        k.area(),
    ]);

    missionObj.pos = k.vec2(k.width() - missionObj.width * SCALE_FACTOR, 0);
    socialsObj.pos = k.vec2(k.width() / 2 - socialsObj.width / 2, k.height() / 10);

    githubLogo.onHover(() => {
        githubLogo.scale = vec2(1.3);
    });
    githubLogo.onHoverEnd(() => {
        githubLogo.scale = vec2(1);
    });
    githubLogo.onClick(() => {
        window.open("https://github.com/vpekdas", "_blank");
    });

    discordLogo.onHover(() => {
        discordLogo.scale = vec2(0.4);
    });
    discordLogo.onHoverEnd(() => {
        discordLogo.scale = vec2(0.3);
    });
    discordLogo.onClick(() => {
        window.open("https://discordapp.com/users/415118435174055947/", "_blank");
    });

    linkedinLogo.onHover(() => {
        linkedinLogo.scale = vec2(1.3);
    });
    linkedinLogo.onHoverEnd(() => {
        linkedinLogo.scale = vec2(1);
    });
    linkedinLogo.onClick(() => {
        window.open("https://www.linkedin.com/in/volkan-pekdas/", "_blank");
    });

    const aboutMeMenu = k.add([
        k.text("About Me", {
            size: 64,
            width: 470,
            font: "myFont",
        }),
        k.pos(aboutMeObj.width / 3, k.height() / 6),
        k.color(k.rgb(0, 255, 255)),
    ]);
    const aboutMeText = k.add([
        k.text(aboutMe, {
            size: 28,
            width: 470,
            font: "myFont",
        }),
        k.pos(aboutMeObj.width / 3, k.height() / 3),
        k.color(k.rgb(57, 255, 20)),
        k.opacity(0),
    ]);

    const missionMenu = k.add([
        k.text("Mission", {
            size: 64,
            width: 470,
            font: "myFont",
        }),
        k.pos(k.width() - missionObj.width * (SCALE_FACTOR - 0.3), k.height() / 6),
        k.color(k.rgb(255, 20, 147)),
    ]);
    const missionText = k.add([
        k.text(mission, {
            size: 28,
            width: 470,
            font: "myFont",
        }),
        k.pos(k.width() - missionObj.width * (SCALE_FACTOR - 0.3), k.height() / 3),
        k.color(k.rgb(57, 255, 20)),
        k.opacity(0),
    ]);

    const socialsMenu = k.add([
        k.text("Connect with Me", {
            size: 64,
            width: 230,
            font: "myFont",
        }),
        k.pos(k.width() / 2 - socialsObj.width / 3, k.height() / 6),
        k.color(k.rgb(255, 0, 0)),
    ]);

    let play = k.add([
        k.text("press space to dive in ! 🤿", {
            size: 48,
            width: 1000,
            font: "myFont",
        }),
        k.pos(k.width() / 3, k.height() * 0.9),
        k.color(k.rgb(255, 255, 0)),
        k.opacity(0),
    ]);

    let blinkPlay = false;
    k.wait(1, () => {
        aboutMeText.opacity = 0.1;
    });
    k.wait(1.1, () => {
        aboutMeText.opacity = 0.5;
    });
    k.wait(1.2, () => {
        aboutMeText.opacity = 1;
    });

    k.wait(4, () => {
        missionText.opacity = 0.1;
    });
    k.wait(4.1, () => {
        missionText.opacity = 0.5;
    });
    k.wait(4.2, () => {
        missionText.opacity = 1;
    });

    k.wait(9.2, () => {
        blinkPlay = true;
    });

    k.onUpdate(() => {
        if (Math.floor(k.time() / 0.5) % 2.5 === 0 && blinkPlay) {
            play.opacity = 1;
        } else {
            play.opacity = 0;
        }
    });

    k.onKeyPress("space", () => {
        k.go("main");
        note.style.display = "block";
        progresBarDone.style.display = "flex";
        progresBar.style.display = "block";
        achievement.style.display = "flex";
    });
});

loadAllResources(k);

k.setBackground(k.Color.fromHex("#2e51b2"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map/map.json")).json();
    const layers = mapData.layers;
    const interactables = [];
    const backgrounds = [];
    const projects = [];
    let animationBanner = false;
    for (let i = 0; i < BACKGROUND_COUNT; i++) backgrounds.push(createBackground(k, 4, `background_${i + 1}`));

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
                        const soLongIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

                        soLongIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });

                        interactables.push(createInteractable(k, "tiles", boundary, 82, 0, 0));
                        addProject(boundary, projects);
                    }
                    if (boundary.name === "ft_printf") {
                        const ftPrintfIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

                        ftPrintfIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });

                        const interactable = createInteractable(k, "tiles", boundary, 13, 0, 0);
                        const interactable2 = createInteractable(k, "tiles", boundary, 14, 32, 0);

                        interactables.push(interactable);
                        interactables.push(interactable2);
                        addProject(boundary, projects);
                    }
                    if (boundary.name == "get_next_line") {
                        const getNextLineIndicatorOffsets = getIndicatorOffset(
                            boundary,
                            DEF_SCALE_IND,
                            INDICATOR_OFFSET
                        );

                        getNextLineIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });

                        interactables.push(createInteractable(k, "tiles", boundary, 124, 0, 0));
                        addProject(boundary, projects);
                    }
                    if (boundary.name == "pipex") {
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
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });

                        interactables.push(createInteractable(k, "pipe", boundary, 0, 0, -8));
                        addProject(boundary, projects);
                    }
                    if (boundary.name == "libft") {
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
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });

                        FURNITURES.forEach(({ frame, x, y }) => {
                            interactables.push(createInteractable(k, "furniture", boundary, frame, x, y));
                        });
                        addProject(boundary, projects);
                    }
                    if (boundary.name === "push_swap") {
                        const pushSwapIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

                        pushSwapIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });

                        BOOKS.forEach(({ type, x, y }) => {
                            interactables.push(createInteractable(k, type, boundary, 0, x, y));
                        });
                        addProject(boundary, projects);
                    }
                    if (boundary.name === "philosophers") {
                        const PhilosophersIndicatorOffsets = getIndicatorOffset(
                            boundary,
                            DEF_SCALE_IND,
                            INDICATOR_OFFSET
                        );
                        PhilosophersIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });
                        interactables.push(createInteractable(k, "tiles", boundary, 159, -10, -13));
                        interactables.push(createInteractable(k, "tiles", boundary, 160, 22, -13));
                        interactables.push(createInteractable(k, "tiles", boundary, 180, -10, 19));
                        interactables.push(createInteractable(k, "tiles", boundary, 181, 22, 19));
                        createInteractable(k, "tiles", boundary, 163, -4, 0);
                        createInteractable(k, "tiles", boundary, 166, 4, -12);
                        addProject(boundary, projects);
                    }
                    if (boundary.name === "minishell") {
                        const minishellIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
                        minishellIndicatorOffsets.forEach(({ dx, dy, direction }) => {
                            createIndicator(boundary.x + dx, boundary.y + dy, direction, k);
                        });
                        interactables.push(createInteractable(k, "tiles", boundary, 48, -18, 1));
                        interactables.push(createInteractable(k, "tiles", boundary, 49, 14, 1));
                        interactables.push(createInteractable(k, "tiles", boundary, 50, 46, 1));
                        addProject(boundary, projects);
                    }
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true;
                        displayDialogue(PROJECT_DESCRIPTIONS[boundary.name].story, () => (player.isInDialogue = false));
                        if (animationBanner === false) {
                            const discovered = countAchievemenDiscovered(projects);
                            const projectIndex = projects.findIndex((project) => project.name === boundary.name);

                            if (projectIndex != -1) {
                                if (projects[projectIndex].discovered) return;
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
                            if (discovered <= projects.length) {
                                updateProgress(projects, discovered);
                            }

                            animationBanner = true;
                            setTimeout(() => {
                                animationBanner = false;
                            }, 7000);
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
                    player.prevPosX = player.pos.x;
                    player.prevPosY = player.pos.y;
                    continue;
                }
            }
        }

        window.addEventListener("DOMContentLoaded", updateProgress);
    }

    loadLocalStorage(projects);
    updateProgress(projects, false);
    showAchievement(projects);

    setCamScale(k);

    k.onResize(() => {
        setCamScale(k);
    });

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);

        const backgroundCamY = player.pos.y - 200;
        let speed = 0;
        for (let i = 0; i < backgrounds.length; i++) {
            updateBackground(k, backgrounds[i], speed, backgroundCamY, player.pos.x, player.prevPosX);
            speed += 0.2;
        }
        player.prevPosX = player.pos.x;
        player.prevPosY = player.pos.y;

        for (const interactable of interactables) {
            interactable.blink = Math.floor(k.time() / 0.5) % 2 === 0;

            if (interactable.blink) {
                interactable.originalSprite.hidden = true;
                interactable.blinkSprite.hidden = false;
            } else {
                interactable.originalSprite.hidden = false;
                interactable.blinkSprite.hidden = true;
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

    k.onKeyPress("m", () => {
        const menu = document.getElementById("hexagon-menu");
        menu.style.display = "flex";
    });

    k.onKeyPress("e", () => {
        const menu = document.getElementById("hexagon-menu");
        menu.style.display = "none";
    });

    k.onKeyPress("c", () => {
        const note = document.querySelector(".note");
        note.style.display = "none";
    });

    k.onKeyPress("h", () => {
        const note = document.querySelector(".note");
        note.style.display = "block";
    });
});

k.go("menu");

// TODO: Add real time background changes.
// TODO: Implement a button to clear local storage if needed.
// TODO: Refactor the entire codebase for better readability, maintainability, and performance.
