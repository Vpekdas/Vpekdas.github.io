import { useEffect } from "react";
import type { GameObj } from "kaplay";
import { loadAllResources } from "../immersive-portfolio/initializeAssets";
import { createBackground, updateBackground } from "../immersive-portfolio/background";
import { createPlayer } from "../immersive-portfolio/player";
import { SCALE_FACTOR } from "../immersive-portfolio/constants";
import { parseLayers } from "../immersive-portfolio/parseMap";
import { createTile } from "../immersive-portfolio/elementFactory";
import { destroyIndicators } from "../immersive-portfolio/collision";
import { handleKeyPressed, handleMouseEvents, movePlayer } from "../immersive-portfolio/Input";
import { setCamScale } from "../immersive-portfolio/camera";

import kaplay from "kaplay";
import { blinkInteractiveElements } from "../immersive-portfolio/ui";
import { createDialogueBox } from "../immersive-portfolio/dialogue";

export default function Game() {
    useEffect(() => {
        const k = kaplay({
            global: false,
            touchToMouse: true,
            background: [0, 0, 255],
        });

        k.scene("main", async () => {
            loadAllResources(k);

            const mapData = await (await fetch("assets/map/map.json")).json();
            const layers = mapData.layers;

            const backgrounds = createBackground(k);

            const map = k.add([k.sprite("map"), k.pos(0), k.scale(SCALE_FACTOR)]);
            const player = createPlayer(k);

            const gameElements = {
                interactiveElements: [],
                projects: [],
                indicators: new Map<String, GameObj>(),
                dialogue: createDialogueBox(k),
            };

            parseLayers(k, player, map, layers, gameElements);

            // Placing manually door so I can control z index.
            createTile(k, "door", 0, 100, 165, 1);

            destroyIndicators(k, gameElements.indicators, gameElements.projects);

            setCamScale(k);

            k.onResize(() => {
                setCamScale(k);
            });

            handleKeyPressed(k, player);

            k.onUpdate(() => {
                movePlayer(player);

                updateBackground(k, backgrounds, player, player.pos.y + 100);

                k.setCamPos(player.pos.x, player.pos.y + 100);

                player.prevPosX = player.pos.x;
                player.prevPosY = player.pos.y;

                blinkInteractiveElements(k, gameElements.interactiveElements);
            });

            handleMouseEvents(k, player);
        });

        k.go("main");

        // Kaplay and React does not match well, even if you quit and remove, it seems like there is still a global
        // Kaplay instance, so If i move on another page then come back, well I Initialize multiple tines Kaplay and causes bug.
        return () => {
            k.quit();
            k.canvas.remove();
        };
    }, []);

    return <div />;
}
