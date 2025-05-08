import { PROJECT_DESCRIPTIONS } from "./constants.js";

import { countDiscoveredProject } from "./utils.js";
import { saveToLocalStorage } from "./localStorage.js";
import { updateProgress } from "./progressBar.js";
import { createFireworks } from "./firework.js";
import { displayDialogue } from "./dialogue.js";
import {
    showAchievementIcon,
    showAchievementTitle,
    showAchievementDescription,
    showAchievementNotification,
    showBannerTemporarily,
    growBanner,
    generateNewDiscoveredAchievement,
} from "./achievement.js";
let animationBanner = false;

export function collision(k, player, boundary, gameElements) {
    player.onCollide(boundary.name, () => {
        if (boundary.name === "PhoneWawe") {
            return;
        }

        player.isInDialogue = true;

        displayDialogue(PROJECT_DESCRIPTIONS[boundary.name].story, () => (player.isInDialogue = false));

        if (animationBanner === false) {
            const discovered = countDiscoveredProject(gameElements.projects);
            const projectIndex = gameElements.projects.findIndex((project) => project.name === boundary.name);
            if (projectIndex != -1 && gameElements.projects[projectIndex].discovered) {
                return;
            }
            saveToLocalStorage(boundary.name);
            setProjectAsDiscovered(gameElements.projects, boundary);
            displayAchievement(boundary);
            destroyIndicators(k, gameElements.indicators, gameElements.projects);

            if (discovered <= gameElements.projects.length) {
                updateProgress(gameElements.projects, discovered);
            }

            animationBanner = true;
            setTimeout(() => {
                animationBanner = false;
            }, 7000);

            if (countDiscoveredProject(gameElements.projects) === gameElements.projects.length) {
                createFireworks(20);
                document.querySelector(".completing-modal-overlay").style.display = "flex";
            }
        }
    });
}

function displayAchievement(boundary) {
    generateNewDiscoveredAchievement(boundary);
    showBannerTemporarily(7000);
    showAchievementNotification(2000);
    showAchievementIcon(3000, PROJECT_DESCRIPTIONS[boundary.name].icon);
    showAchievementTitle(3000, PROJECT_DESCRIPTIONS[boundary.name].title);
    showAchievementDescription(3000, PROJECT_DESCRIPTIONS[boundary.name].achievement);
    growBanner();
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
