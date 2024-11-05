import { SCALE_FACTOR, OFFSET_X, OFFSET_Y } from "./constants.js";

export function displayDialogue(text, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");

    dialogueUI.style.display = "block";

    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }
        clearInterval(intervalRef);
    }, 5);

    const closeBtn = document.getElementById("close");

    function onCloseClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseClick);
        ensureCanvasFocus();
    }

    closeBtn.addEventListener("click", onCloseClick);
}

export function closeDialogue() {
    const dialogueUI = document.getElementById("textbox-container");
    dialogueUI.style.display = "none";
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
        return;
    }

    k.camScale(k.vec2(1.5));
}

export function createHoverEvents(k, options) {
    let {
        name,
        bubbleX,
        bubbleY,
        bubbleScale,
        textSize,
        textWidth,
        textX,
        textY,
        sprite = "hover",
        font = "myFont",
    } = options;
    let bubble = null;
    let bubbleText = null;

    k.onHover(name, (obj) => {
        if (!bubble) {
            bubble = k.add([k.sprite(sprite), k.pos(obj.pos.x + bubbleX, obj.pos.y + bubbleY), k.scale(bubbleScale)]);

            bubbleText = k.add([
                k.text(name, {
                    size: textSize,
                    width: textWidth,
                    font: font,
                }),
                k.pos(obj.pos.x + textX, obj.pos.y + textY),
            ]);
        }
    });

    k.onHoverEnd(name, () => {
        if (bubble) {
            k.destroy(bubble);
            bubble = null;
        }

        if (bubbleText) {
            k.destroy(bubbleText);
            bubbleText = null;
        }
    });
}

export function loadAllResources(k) {
    const resources = {
        fonts: [{ name: "myFont", path: "ThaleahFat.ttf" }],
        sprites: [
            { name: "hover", path: "./hover/hover.png" },
            {
                name: "indicator",
                path: "./ui/1.png",
                config: {
                    sliceX: 8,
                    sliceY: 2,
                    anims: {
                        top_left: { from: 0, to: 3, loop: true, speed: 8 },
                        top_right: { from: 4, to: 7, loop: true, speed: 8 },
                        bot_left: { from: 8, to: 11, loop: true, speed: 8 },
                        bot_right: { from: 12, to: 15, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "player",
                path: "/character/character.png",
                config: {
                    sliceX: 4,
                    sliceY: 4,
                    anims: {
                        "idle-down": 0,
                        "walk-down": { from: 0, to: 3, loop: true, speed: 8 },
                        "idle-side": 4,
                        "walk-side": { from: 4, to: 7, loop: true, speed: 8 },
                        "idle-up": 12,
                        "walk-up": { from: 12, to: 15, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "okabe",
                path: "/steins-gate/okabe.png",
                config: {
                    sliceX: 5,
                    sliceY: 1,
                    anims: {
                        idle: { from: 0, to: 2, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "kurisu",
                path: "/steins-gate/kurisu.png",
                config: {
                    sliceX: 5,
                    sliceY: 3,
                    anims: {
                        idle: { from: 0, to: 11, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "steins-gate-background",
                path: "/steins-gate/background.png",
                config: {
                    sliceX: 4,
                    sliceY: 3,
                    anims: {
                        opening: { from: 0, to: 11, loop: true, speed: 8 },
                    },
                },
            },
            {
                name: "lightning",
                path: "lightning/4.png",
                config: {
                    sliceX: 3,
                    sliceY: 3,
                    anims: {
                        shock: { from: 0, to: 6, loop: true, speed: 18 },
                    },
                },
            },
            {
                name: "lightning2",
                path: "lightning/3.png",
                config: {
                    sliceX: 3,
                    sliceY: 3,
                    anims: {
                        shock: { from: 0, to: 6, loop: true, speed: 18 },
                    },
                },
            },
            {
                name: "tiles",
                path: "/tiles/spritesheet.png",
                config: { sliceX: 21, sliceY: 11 },
            },
            { name: "pipe", path: "/pipe/1.png" },
            {
                name: "furniture",
                path: "/furniture/hous_furniture.png",
                config: { sliceX: 13, sliceY: 18 },
            },
            { name: "book", path: "/books/1.png" },
            { name: "book2", path: "/books/2.png" },
            { name: "early-morning-1", path: "/background/early-morning/1.png" },
            { name: "early-morning-2", path: "/background/early-morning/2.png" },
            { name: "early-morning-3", path: "/background/early-morning/3.png" },
            { name: "early-morning-4", path: "/background/early-morning/4.png" },
            { name: "early-morning-5", path: "/background/early-morning/5.png" },
            { name: "morning-1", path: "/background/morning/1.png" },
            { name: "morning-2", path: "/background/morning/2.png" },
            { name: "morning-3", path: "/background/morning/3.png" },
            { name: "morning-4", path: "/background/morning/4.png" },
            { name: "morning-5", path: "/background/morning/5.png" },
            { name: "afternoon-1", path: "/background/afternoon/1.png" },
            { name: "afternoon-2", path: "/background/afternoon/2.png" },
            { name: "afternoon-3", path: "/background/afternoon/3.png" },
            { name: "afternoon-4", path: "/background/afternoon/4.png" },
            { name: "afternoon-5", path: "/background/afternoon/5.png" },
            { name: "evening-1", path: "/background/evening/1.png" },
            { name: "evening-2", path: "/background/evening/2.png" },
            { name: "evening-3", path: "/background/evening/3.png" },
            { name: "evening-4", path: "/background/evening/4.png" },
            { name: "evening-5", path: "/background/evening/5.png" },
            { name: "night-1", path: "/background/night/1.png" },
            { name: "night-2", path: "/background/night/2.png" },
            { name: "night-3", path: "/background/night/3.png" },
            { name: "night-4", path: "/background/night/4.png" },
            { name: "night-5", path: "/background/night/5.png" },
            { name: "map", path: "/map/map.png" },
            { name: "msg", path: "/menu/Msg01.png" },
            { name: "msg2", path: "/menu/Msg03.png" },
            { name: "msg3", path: "/menu/Msg10.png" },
            { name: "menu-background", path: "background/Cyberpunk_city_street.gif" },
            { name: "phonewawe", path: "/steins-gate/phonewawe.png" },
            { name: "sg-001", path: "/steins-gate/sg-001.png" },
        ],
    };

    resources.fonts.forEach((font) => {
        k.loadFont(font.name, font.path);
    });

    resources.sprites.forEach((sprite) => {
        if (sprite.config) {
            k.loadSprite(sprite.name, sprite.path, sprite.config);
        } else {
            k.loadSprite(sprite.name, sprite.path);
        }
    });
}

export function createTile(k, tiles, frame, x, y, z) {
    const originalSprite = k.add([
        k.sprite(tiles, { frame }),
        k.pos(x * SCALE_FACTOR, y * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
        k.z(z),
    ]);

    return originalSprite;
}

export function createInteractable(k, tiles, boundary, frame, modifX, modifY) {
    const originalSprite = k.add([
        k.sprite(tiles, { frame }),
        k.pos((boundary.x + OFFSET_X + modifX) * SCALE_FACTOR, (boundary.y + OFFSET_Y + modifY) * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
    ]);

    return {
        originalSprite,
        blink: false,
    };
}

export function createIndicator(x, y, animation, k) {
    const indicator = k.add([
        k.sprite("indicator"),
        k.pos((x + OFFSET_X) * SCALE_FACTOR, (y + OFFSET_Y) * SCALE_FACTOR),
        k.scale(SCALE_FACTOR),
    ]);
    indicator.play(animation);
    return indicator;
}

export function getIndicatorOffset(boundary, indicatorScale, offset) {
    const topLeft = indicatorScale[0];
    const topRight = indicatorScale[1];
    const bottomLeft = indicatorScale[2];
    const bottomRight = indicatorScale[3];
    return [
        {
            dx: -offset * topLeft.x,
            dy: -offset * topLeft.y,
            direction: "top_left",
        },
        {
            dx: -offset * bottomLeft.x,
            dy: boundary.height - offset * bottomLeft.y,
            direction: "bot_left",
        },
        {
            dx: boundary.width - offset * topRight.x,
            dy: -offset * topRight.y,
            direction: "top_right",
        },
        {
            dx: boundary.width - offset * bottomRight.x,
            dy: boundary.height - offset * bottomRight.y,
            direction: "bot_right",
        },
    ];
}

export function countAchievementDiscovered(projects) {
    let achievement = 0;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered === true) {
            achievement++;
        }
    }
    return achievement;
}

export function addProject(boundary, projects) {
    projects.push({
        name: boundary.name,
        discovered: false,
    });
}

export function setProjectAsDiscovered(projects, boundary) {
    for (let i = 0; i < projects.length; i++) {
        if (boundary.name === projects[i].name && projects[i].discovered != true) {
            projects[i].discovered = true;
        }
    }
}

export function updateProgress(projects, discovered) {
    const elem = document.querySelector(".progress-done");
    const achievementDiscovered = countAchievementDiscovered(projects);
    const achievementTotal = projects.length;
    const interval = 100;
    let currentWidth = (discovered / achievementTotal) * 100;
    if (achievementDiscovered === achievementTotal) {
        const highlight = document.querySelector(".highlight");
        highlight.style.color = "green";
    }
    function frame() {
        let targetWidth = (achievementDiscovered / achievementTotal) * 100;
        {
            if (currentWidth < targetWidth) {
                currentWidth += 1;
                if (currentWidth > 100) {
                    currentWidth = 100;
                }
                elem.style.width = `${currentWidth.toFixed(0)}%`;
                elem.innerHTML = `${currentWidth.toFixed(0)}%`;
            }
        }
    }
    setInterval(frame, interval);
}

export function showAchievementIcon(duration, path) {
    const icon = document.querySelector(".achievement-icon");
    icon.src = path;
    icon.style.display = "none";
    setTimeout(() => {
        icon.style.display = "block";
    }, duration);
}

export function showAchievementTitle(duration, text) {
    const title = document.querySelector(".achievement-title");
    title.style.display = "none";
    title.textContent = text;
    setTimeout(() => {
        title.style.display = "block";
    }, duration);
}

export function showAchievementDescription(duration, text) {
    const description = document.querySelector(".achievement-description");
    description.style.display = "none";
    description.textContent = text;
    setTimeout(() => {
        description.style.display = "block";
    }, duration);
}

export function showAchievementNotification(duration) {
    const notification = document.querySelector(".achievement-notification");
    notification.textContent = "Achievement Unlocked !";
    notification.style.display = "none";

    setTimeout(() => {
        notification.style.display = "block";
    }, duration);

    setTimeout(
        () => {
            notification.style.display = "none";
        },
        duration + duration / 2
    );
}

export function showBannerTemporarily(duration) {
    const banner = document.querySelector(".achievement-banner");
    banner.style.display = "block";

    setTimeout(() => {
        banner.style.display = "none";
    }, duration);
}

export function growBanner() {
    const banner = document.querySelector(".achievement-banner");
    let currentWidth = 0;
    const maxWidth = 400;
    const increment = 5;
    const intervalTime = 20;

    const interval = setInterval(() => {
        currentWidth += increment;
        banner.style.width = `${currentWidth}px`;

        if (currentWidth >= maxWidth) {
            clearInterval(interval);
        }
    }, intervalTime);
}

export function showAchievement(projects) {
    for (let i = 0; i < projects.length; i++) {
        const icon = document.getElementById(projects[i].name);
        if (projects[i].discovered === true) {
            icon.style.display = "block";
        }
    }
}

export function saveToLocalStorage(projectName) {
    localStorage.setItem(projectName, 1);
}

export function loadLocalStorage(projects) {
    for (let i = 0; i < projects.length; i++) {
        if (localStorage.getItem(projects[i].name) === "1") {
            projects[i].discovered = true;
        } else {
            projects[i].discovered = false;
        }
    }
}

export function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

function clearLocalStorage(storageModalOverlay) {
    localStorage.clear();
    storageModalOverlay.style.display = "none";
    location.reload();
}

function closePopup(storageModalOverlay) {
    storageModalOverlay.style.display = "none";
}

function openPopup() {
    const storageModalOverlay = document.querySelector(".storage-modal-overlay");
    const confirmButton = document.getElementById("confirm-button");
    const cancelButton = document.getElementById("cancel-button");

    storageModalOverlay.style.display = "flex";
    confirmButton.addEventListener("click", () => clearLocalStorage(storageModalOverlay));
    cancelButton.addEventListener("click", () => closePopup(storageModalOverlay));
}

export function clearPopup() {
    const clearButton = document.querySelector(".clear-storage-button");

    clearButton.addEventListener("click", () => openPopup());
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

export function ensureCanvasFocus() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
        canvas.focus();
    }
}

export function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function createFireworks(number) {
    for (let i = 0; i < number; i++) {
        setTimeout(() => {
            const firework = document.createElement("div");
            let randomColor = getRandomColor();
            firework.classList.add("firework");
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.setProperty("--color", randomColor);
            document.body.appendChild(firework);

            firework.addEventListener("animationend", () => {
                firework.remove();
            });
        }, i * 100);
    }
}

export function resetAdventure() {
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}

loadSound("opening", "/steins-gate/opening.mp3");

export function playMusic() {
    const music = play("opening", {
        loop: true,
        volume: 0.5,
    });
}

const maxDivergence = 1.048596;
const initialDivergence = 0.337187;
const totalDigits = 10;
let currentDivergence = initialDivergence;

function spinDigit(element, correctChar, delay) {
    const spinInterval = setInterval(() => {
        const randomDigit = Math.floor(Math.random() * totalDigits);
        element.src = `img/${randomDigit}.jpg`;
    }, 100);

    setTimeout(() => {
        clearInterval(spinInterval);
        element.src = `img/${correctChar === "." ? "dot" : correctChar}.jpg`;
    }, 3000 + delay);
}

export function regenerateNumber(projects) {
    if (currentDivergence >= maxDivergence) {
        return;
    }

    const discoveredProjects = countAchievementDiscovered(projects);

    if (discoveredProjects === projects.length) {
        currentDivergence = maxDivergence;
    } else if (discoveredProjects > 0) {
        const increment = (maxDivergence - initialDivergence) / projects.length;
        currentDivergence += increment;
        if (currentDivergence > maxDivergence) {
            currentDivergence = maxDivergence;
        }
    }

    const divergenceString = currentDivergence.toFixed(6).toString();
    const digits = divergenceString.split("");

    const glitchContainer = document.querySelector(".glitch");
    glitchContainer.innerHTML = "";

    digits.forEach((char, index) => {
        const img = document.createElement("img");
        img.src = `img/${char === "." ? "dot" : char}.jpg`;
        img.alt = `Digit ${char}`;
        img.classList.add("glitch-digit");
        glitchContainer.appendChild(img);

        spinDigit(img, char, index * 100);
    });
}
