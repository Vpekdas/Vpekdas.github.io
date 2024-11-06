export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
        return;
    }

    k.camScale(k.vec2(1.5));
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

export function playMusic() {
    loadSound("opening", "/steins-gate/opening.mp3");

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

export function blinkInteractables(k, interactables) {
    for (const interactable of interactables) {
        interactable.blink = Math.floor(k.time() / 0.5) % 2 === 0;

        if (interactable.blink) {
            interactable.originalSprite.opacity = 0.75;
        } else {
            interactable.originalSprite.opacity = 1;
        }
    }
}
