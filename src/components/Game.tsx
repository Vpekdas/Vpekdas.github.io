import { useEffect, useRef } from "react";
import type { GameObj, KAPLAYCtx } from "kaplay";
import { loadAllResources } from "../Game/initializeAssets";
import { changeBackgroundHour, createAllBackground } from "../Game/background";
import { getCurrentHour } from "../Game/hours";
import { createPlayer } from "../Game/player";
import { DOOR_OFFSET, HOVER_EVENTS, SCALE_FACTOR } from "../Game/constants";
import { parseLayers } from "../Game/parseMap";
import { createHoverEvents, createTile } from "../Game/elementFactory";
import { loadLocalStorage } from "../Game/localStorage";
import { updateProgress } from "../Game/progressBar";
import { destroyIndicators } from "../Game/collision";
import { handleInput, handleKeyPressed, handleMouseEvents, movePlayer } from "../Game/Input";
import { setCamScale } from "../Game/camera";

import kaplay from "kaplay";

export default function Game() {
    useEffect(() => {
        const k = kaplay({
            global: false,
            touchToMouse: true,
            background: [0, 0, 255],
        });

        k.scene("main", async () => {
            loadAllResources(k);

            const mapData = await (await fetch("./map/map.json")).json();
            const layers = mapData.layers;

            createAllBackground(k);

            const currentHour = getCurrentHour();
            const map = k.add([k.sprite("map"), k.pos(0), k.scale(SCALE_FACTOR)]);
            const player = createPlayer(k);

            let backgroundCamY = 0,
                backgroundSpeed = 0;

            const gameElements = {
                interactiveElements: [],
                projects: [],
                indicators: new Map<String, GameObj>(),
                startX: 0,
                startY: 0,
            };

            parseLayers(k, player, map, layers, gameElements);

            for (let i = 0; i < 3; i++) {
                createTile(k, "tiles", 153 + i, 48 + 6 + DOOR_OFFSET * i, 150, 3);
                createTile(k, "tiles", 174 + i, 48 + 6 + DOOR_OFFSET * i, 182, 0);
            }

            loadLocalStorage(gameElements.projects);
            updateProgress(gameElements.projects, false);

            destroyIndicators(k, gameElements.indicators, gameElements.projects);

            window.addEventListener("DOMContentLoaded", () => {
                updateProgress(gameElements.projects, false);
            });

            setCamScale(k);

            k.onResize(() => {
                setCamScale(k);
            });

            handleInput();

            k.onUpdate(() => {
                handleKeyPressed(k, player);

                movePlayer(player);

                k.setCamPos(player.pos.x, player.pos.y + 100);

                backgroundCamY = player.pos.y - 200;

                changeBackgroundHour(backgroundSpeed, backgroundCamY, player, currentHour);

                player.prevPosX = player.pos.x;
                player.prevPosY = player.pos.y;

                blinkInteractiveElements(k, gameElements.interactiveElements);
            });

            HOVER_EVENTS.forEach((event) => {
                createHoverEvents(k, event);
            });

            handleMouseEvents(k, player);
        });

        k.go("main");

        function blinkInteractiveElements(k: KAPLAYCtx, interactiveElements: any) {
            for (const element of interactiveElements) {
                element.blink = Math.floor(k.time() / 0.5) % 2 === 0;

                if (element.blink) {
                    element.originalSprite.opacity = 0.75;
                } else {
                    element.originalSprite.opacity = 1;
                }
            }
        }

        // Kaplay and React does not match well, even if you quit and remove, it seems like there is still a global
        // Kaplay instance, so If i move on another page then come back, well I Initialize multiple tines Kaplay and causes bug.
        return () => {
            k.quit();
            k.canvas.remove();
        };
    }, []);

    return <div />;
}
