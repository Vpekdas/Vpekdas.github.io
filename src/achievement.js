import { PROJECT_DESCRIPTIONS } from "./constants";

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

const iconContainer = document.getElementById("iconContainer");

export function generateDiscoveredAchievements(projects) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered) {
            generateNewDiscoveredAchievement(projects[i]);
        }
    }
}

export function generateNewDiscoveredAchievement(boundary) {
    const div = document.createElement("div");
    div.className = "icon";
    div.id = boundary.name;

    const img = document.createElement("img");
    img.src = PROJECT_DESCRIPTIONS[boundary.name].icon;

    const secondDiv = document.createElement("div");
    secondDiv.className = "icon-message-box";

    const span = document.createElement("span");
    span.className = "icon-name";
    span.textContent = boundary.name;

    secondDiv.appendChild(span);

    div.appendChild(img);
    div.appendChild(secondDiv);

    iconContainer.appendChild(div);
}
