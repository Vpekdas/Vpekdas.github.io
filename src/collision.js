import { countDiscoveredProject } from "./utils.js";
import { regenerateNumber } from "./divergenceMeter.js";
import { ensureCanvasFocus } from "./utils";
import { saveToLocalStorage } from "./localStorage.js";
import { updateProgress } from "./progressBar.js";
import { createFireworks } from "./firework.js";
import { playMusic } from "./music.js";
import { displaySteinsGateBackground, destroyBackground } from "./background.js";
import { displayDialogue } from "./dialogue.js";
import { PROJECT_DESCRIPTIONS, OkabeDialogue, KurisuDialogue } from "./constants.js";
import {
    showAchievementIcon,
    showAchievementTitle,
    showAchievementDescription,
    showAchievementNotification,
    showBannerTemporarily,
    growBanner,
    showAchievement,
} from "./achievement.js";
import { SCALE_FACTOR } from "./constants.js";
let animationBanner = false;

export function collision(k, player, boundary, gameElements) {
    player.onCollide(boundary.name, () => {
        if (boundary.name === "PhoneWawe") {
            gameElements.chronometer.timeout = true;

            if (!gameElements.chronometer.timerId) {
                gameElements.chronometer.seconds = 0;
                gameElements.chronometer.timerId = setInterval(() => {
                    gameElements.chronometer.seconds++;
                }, 1000);
            }

            if (
                countDiscoveredProject(gameElements.projects) === gameElements.projects.length &&
                gameElements.chronometer.timeout
            ) {
                gameElements.lightningRefs.lightning = k.add([
                    k.sprite("lightning"),
                    k.pos(boundary.x * SCALE_FACTOR, (boundary.y + 6) * SCALE_FACTOR),
                    k.scale(1),
                ]);
                gameElements.lightningRefs.lightning.play("shock");

                gameElements.lightningRefs.lightning2 = k.add([
                    k.sprite("lightning2"),
                    k.pos(boundary.x * SCALE_FACTOR, (boundary.y + 18) * SCALE_FACTOR),
                    k.scale(1),
                ]);
                gameElements.lightningRefs.lightning2.play("shock");
            }

            return;
        }

        player.isInDialogue = true;

        if (boundary.name === "SG-001") {
            if (
                !gameElements.chronometer.timeout ||
                countDiscoveredProject(gameElements.projects) != gameElements.projects.length ||
                gameElements.steinsGate
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
                    gameElements.steinsGate = true;
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
            player.pos.x = gameElements.startX;
            player.pos.y = gameElements.startY;
            player.isInDialogue = false;
            return;
        }

        displayDialogue(PROJECT_DESCRIPTIONS[boundary.name].story, () => (player.isInDialogue = false));

        if (animationBanner === false) {
            const discovered = countDiscoveredProject(gameElements.projects);
            const projectIndex = gameElements.projects.findIndex((project) => project.name === boundary.name);
            if (projectIndex != -1 && gameElements.projects[projectIndex].discovered) {
                return;
            }
            saveToLocalStorage(boundary.name);
            setProjectAsDiscovered(gameElements.projects, boundary);
            displayAchievement(gameElements.projects, boundary);
            destroyIndicators(k, gameElements.indicators, gameElements.projects);
            regenerateNumber(gameElements.projects);

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

function displayAchievement(projects, boundary) {
    showAchievement(projects);
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
