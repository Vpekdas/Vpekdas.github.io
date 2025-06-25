import type { GameObj, KAPLAYCtx } from "kaplay";
import type { GameElements } from "../components/Game.js";
import { collision } from "./collision.js";
import { createIndicator, createInteractable, getIndicatorOffset } from "./elementFactory.js";
import { OFFSET_X, OFFSET_Y, SCALE_FACTOR, DEF_SCALE_IND, INDICATOR_OFFSET } from "./constants.js";

export function parseLayers(
    k: KAPLAYCtx,
    player: GameObj,
    map: GameObj,
    layers: any,
    gameElements: GameElements
): void {
    for (const layer of layers) {
        if (layer.name === "boundaries") {
            for (const boundary of layer.objects) {
                generateBoundingBox(k, map, boundary);
                if (boundary.name) {
                    generateInteractiveElements(k, boundary, gameElements);
                }
                collision(k, player, boundary, gameElements);
            }
            continue;
        }

        if (layer.name === "spawnpoint") {
            generatePlayerPosition(k, layer, player, map, gameElements);
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

    gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 82, 0, 0));
    addProject(boundary, gameElements.projects);
    gameElements.indicators[boundary.name] = indicators;
}

function generatePlayerPosition(k: KAPLAYCtx, layer: any, player: any, map: any, gameElements: any) {
    for (const entity of layer.objects) {
        if (entity.name === "player") {
            player.pos = k.vec2(
                (map.pos.x + entity.x + OFFSET_X) * SCALE_FACTOR,
                (map.pos.y + entity.y + OFFSET_Y) * SCALE_FACTOR
            );
            gameElements.startX = (map.pos.x + entity.x + OFFSET_X) * SCALE_FACTOR;
            gameElements.startY = (map.pos.y + entity.y + OFFSET_Y) * SCALE_FACTOR;
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
