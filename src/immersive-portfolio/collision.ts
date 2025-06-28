import { PROJECT_DESCRIPTIONS, type ProjectKey } from "./constants.js";

import type { GameObj, KAPLAYCtx } from "kaplay";
import { closeDialogue, modifyDialogue } from "./dialogue.js";

export function collision(k: KAPLAYCtx, player: GameObj, boundary: any, gameElements: any) {
    player.onCollide(boundary.name, () => {
        const name = boundary.name as ProjectKey;

        if (name in PROJECT_DESCRIPTIONS) {
            modifyDialogue(k, gameElements.dialogue, PROJECT_DESCRIPTIONS[name].description);
        }
        const projectIndex = gameElements.projects.findIndex((project: any) => project.name === boundary.name);
        if (projectIndex != -1 && gameElements.projects[projectIndex].discovered) {
            return;
        }
        setProjectAsDiscovered(gameElements.projects, boundary);
        destroyIndicators(k, gameElements.indicators, gameElements.projects);

        const elToRemove = gameElements.interactiveElements.find((el: any) => el.name === boundary.name);
        if (elToRemove) {
            elToRemove.sprite.opacity = 1;
        }
        gameElements.interactiveElements = gameElements.interactiveElements.filter(
            (el: any) => el.name !== boundary.name
        );
    });

    player.onCollideEnd(boundary.name, () => {
        closeDialogue(gameElements.dialogue.box);
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
