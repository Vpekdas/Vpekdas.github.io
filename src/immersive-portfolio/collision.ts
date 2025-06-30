import type { GameObj, KAPLAYCtx } from "kaplay";
import { PROJECT_DESCRIPTIONS, type ProjectKey } from "./constants.js";
import { closeDialogue, handleDialogue } from "./dialogue.js";

/**
 * Updates and handles collision events such as discovering a project, removing its indicators and blinking effect, and closing the dialogue.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {GameObj} player The player game object.
 * @param {any} boundary Contains JSON information about a boundary placed in Tiled.
 * @param {GameElements} gameElements Custom object that contains projects, interactive elements, indicators, and the dialogue.
 * @returns {void}
 */
export function collision(k: KAPLAYCtx, player: GameObj, boundary: any, gameElements: any): void {
    player.onCollide(boundary.name, () => {
        const name = boundary.name as ProjectKey;

        if (name in PROJECT_DESCRIPTIONS) {
            handleDialogue(
                k,
                gameElements.dialogue,
                PROJECT_DESCRIPTIONS[name].description,
                PROJECT_DESCRIPTIONS[name].url,
                boundary.name
            );
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

/**
 * Destroys indicators associated with discovered projects.
 * @param {KAPLAYCtx} k The Kaplay context.
 * @param {Map<string, GameObj[]>} indicators Map containing all indicators, keyed by boundary name.
 * @param {any} projects Array containing project objects.
 * @returns {void}
 */
export function destroyIndicators(k: KAPLAYCtx, indicators: Map<string, GameObj[]>, projects: any): void {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered === true) {
            const indicatorArr = indicators.get(projects[i].name);
            if (indicatorArr) {
                indicatorArr.forEach((indicator: GameObj) => {
                    k.destroy(indicator);
                });
            }
        }
    }
}
