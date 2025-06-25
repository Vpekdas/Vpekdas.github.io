import { PROJECT_DESCRIPTIONS, type ProjectKey } from "./constants.js";
import { displayDialogue } from "./dialogue.js";
import { countDiscoveredProject } from "./utils.js";
import { saveToLocalStorage } from "./localStorage.js";

import type { GameObj, KAPLAYCtx } from "kaplay";
import { updateProgress } from "./progressBar.js";

export function collision(k: KAPLAYCtx, player: GameObj, boundary: any, gameElements: any) {
    player.onCollide(boundary.name, () => {
        player.isInDialogue = true;

        const name = boundary.name as ProjectKey;
        if (name in PROJECT_DESCRIPTIONS) {
            displayDialogue(PROJECT_DESCRIPTIONS[name].story, () => (player.isInDialogue = false));
        }
        const discovered = countDiscoveredProject(gameElements.projects);
        const projectIndex = gameElements.projects.findIndex((project: any) => project.name === boundary.name);
        if (projectIndex != -1 && gameElements.projects[projectIndex].discovered) {
            return;
        }
        saveToLocalStorage(boundary.name);
        setProjectAsDiscovered(gameElements.projects, boundary);
        destroyIndicators(k, gameElements.indicators, gameElements.projects);

        if (discovered <= gameElements.projects.length) {
            updateProgress(gameElements.projects, discovered);
        }
    });
}

function setProjectAsDiscovered(projects: any, boundary: any) {
    for (let i = 0; i < projects.length; i++) {
        if (boundary.name === projects[i].name && projects[i].discovered != true) {
            projects[i].discovered = true;
        }
    }
}

export function destroyIndicators(k: KAPLAYCtx, indicators: any, projects: any) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered === true) {
            indicators[projects[i].name].forEach((indicator: GameObj) => {
                k.destroy(indicator);
            });
        }
    }
}
