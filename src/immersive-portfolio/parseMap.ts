import type { GameObj, KAPLAYCtx } from "kaplay";
import { collision } from "./collision.js";
import { createIndicator, createInteractable, getIndicatorOffset } from "./elementFactory.js";
import {
    OFFSET_X,
    OFFSET_Y,
    SCALE_FACTOR,
    DEF_SCALE_IND,
    INDICATOR_OFFSET,
    TEXT_WIDTH,
    TEXT_SIZE,
    TEXT_SCALE,
} from "./constants.js";
import { generateHoverEvents, type HoverProps } from "./ui.js";

export function parseLayers(k: KAPLAYCtx, player: GameObj, map: GameObj, layers: any, gameElements: any): void {
    for (const layer of layers) {
        if (layer.name === "boundaries") {
            for (const boundary of layer.objects) {
                generateBoundingBox(k, map, boundary);
                if (boundary.name) {
                    generateInteractiveElements(k, boundary, gameElements);

                    const props: HoverProps = {
                        name: boundary.name,
                        bubbleX: boundary.x * SCALE_FACTOR,
                        bubbleY: boundary.y * SCALE_FACTOR,
                        bubbleScale: TEXT_SCALE,
                        textSize: TEXT_SIZE,
                        textWidth: TEXT_WIDTH * SCALE_FACTOR,
                        textX:
                            boundary.x * SCALE_FACTOR +
                            (boundary.name.length * SCALE_FACTOR) / 2 +
                            TEXT_WIDTH -
                            TEXT_SIZE,
                        textY: boundary.y * SCALE_FACTOR + (boundary.name.length * SCALE_FACTOR) / 2,
                    };

                    generateHoverEvents(k, props);
                }
                collision(k, player, boundary, gameElements);
            }
            continue;
        }

        if (layer.name === "spawnpoint") {
            generatePlayerPosition(k, layer, player, map);
        }
    }
}

function generateBoundingBox(k: KAPLAYCtx, map: any, boundary: any) {
    map.add([
        k.area({
            shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
        }),
        k.body({ isStatic: true }),
        k.pos(boundary.x + OFFSET_X, boundary.y + OFFSET_Y),
        boundary.name,
    ]);
}

function generateInteractiveElements(k: KAPLAYCtx, boundary: any, gameElements: any): void {
    const indicators: any = [];
    const indicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

    indicatorOffsets.forEach(({ dx, dy, direction }) => {
        indicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
    });

    addProject(boundary, gameElements.projects);
    gameElements.indicators[boundary.name] = indicators;
    if (boundary.name === "so_long") {
        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 82, -4, 0));
    } else if (boundary.name === "philosophers") {
        gameElements.interactiveElements.push(createInteractable(k, "philosophers", boundary, 0, -10, -14));
        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 163, 0, 0));
        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 166, 0, -12));
    } else if (boundary.name === "minishell") {
        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 35, -1, -5));
    } else if (boundary.name === "unity") {
        gameElements.interactiveElements.push(createInteractable(k, "unity", boundary, 0, 0, 0));
    } else if (boundary.name === "webserv") {
        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 158, -2, 0));
    } else if (boundary.name === "scop") {
        gameElements.interactiveElements.push(createInteractable(k, "scop", boundary, 0, -10, -4));
    } else if (boundary.name === "ft_transcendance") {
        gameElements.interactiveElements.push(createInteractable(k, "ft_transcendance", boundary, 0, -6, 0));
    }
}

function generatePlayerPosition(k: KAPLAYCtx, layer: any, player: any, map: any) {
    for (const entity of layer.objects) {
        if (entity.name === "player") {
            player.pos = k.vec2(
                (map.pos.x + entity.x + OFFSET_X) * SCALE_FACTOR,
                (map.pos.y + entity.y + OFFSET_Y) * SCALE_FACTOR
            );
            player.prevPosX = player.pos.x;
            player.prevPosY = player.pos.y;
            return;
        }
    }
}

function addProject(boundary: any, projects: any) {
    projects.push({
        name: boundary.name,
        discovered: false,
    });
}
