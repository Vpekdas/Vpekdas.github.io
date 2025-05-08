import { OFFSET_X, OFFSET_Y, SCALE_FACTOR, DEF_SCALE_IND, INDICATOR_OFFSET } from "./constants.js";
import { getIndicatorOffset, createIndicator, createInteractable } from "./elementFactory.js";
import { collision } from "./collision.js";

export function parseLayers(k, player, map, layers, gameElements) {
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

function generateBoundingBox(k, map, boundary) {
    map.add([
        k.area({
            shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height),
        }),
        k.body({ isStatic: true }),
        k.pos(boundary.x + OFFSET_X, boundary.y + OFFSET_Y),
        boundary.name,
    ]);
}

function generateInteractiveElements(k, boundary, gameElements) {
    if (boundary.name === "so_long") {
        const soLongIndicators = [];
        const soLongIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

        soLongIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            soLongIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });

        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 82, 0, 0));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = soLongIndicators;
    }
    if (boundary.name === "ft_printf") {
        const ftPrintfIndicators = [];
        const ftPrintfIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

        ftPrintfIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            ftPrintfIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });

        gameElements.interactiveElements.push(createInteractable(k, "homeSweetHome", boundary, 0, 0, 0));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = ftPrintfIndicators;
    }
    if (boundary.name == "get_next_line") {
        const getNextLineIndicators = [];
        const getNextLineIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

        getNextLineIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            getNextLineIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });

        gameElements.interactiveElements.push(createInteractable(k, "tiles", boundary, 124, 0, 0));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = getNextLineIndicators;
    }
    if (boundary.name == "pipex") {
        const pipexIndicators = [];
        const pipexIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

        pipexIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            pipexIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });

        gameElements.interactiveElements.push(createInteractable(k, "pipe", boundary, 0, -4, 2));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = pipexIndicators;
    }
    if (boundary.name == "libft") {
        const libftIndicators = [];
        const libftIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

        libftIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            libftIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });
        gameElements.interactiveElements.push(createInteractable(k, "library", boundary, 0, 0, 0));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = libftIndicators;
    }
    if (boundary.name === "push_swap") {
        const pushSwapIndicators = [];
        const pushSwapIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);

        pushSwapIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            pushSwapIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });

        gameElements.interactiveElements.push(createInteractable(k, "books", boundary, 0, 0, 0));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = pushSwapIndicators;
    }
    if (boundary.name === "philosophers") {
        const PhilosophersIndicators = [];
        const PhilosophersIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
        PhilosophersIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            PhilosophersIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });
        gameElements.interactiveElements.push(createInteractable(k, "table", boundary, 0, -1, 0));

        // Food on table.
        createInteractable(k, "tiles", boundary, 163, -4, 0);
        createInteractable(k, "tiles", boundary, 166, 4, -12);

        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = PhilosophersIndicators;
    }
    if (boundary.name === "minishell") {
        const minishellIndicators = [];
        const minishellIndicatorOffsets = getIndicatorOffset(boundary, DEF_SCALE_IND, INDICATOR_OFFSET);
        minishellIndicatorOffsets.forEach(({ dx, dy, direction }) => {
            minishellIndicators.push(createIndicator(boundary.x + dx, boundary.y + dy, direction, k));
        });
        gameElements.interactiveElements.push(createInteractable(k, "computers", boundary, 0, -1, 0));
        addProject(boundary, gameElements.projects);
        gameElements.indicators[boundary.name] = minishellIndicators;
    }
    if (boundary.name === "PhoneWawe") {
        k.add([
            k.sprite("phonewawe"),
            k.pos((boundary.x + 22) * SCALE_FACTOR, (boundary.y + 32) * SCALE_FACTOR),
            k.scale(0.1),
        ]);
    }
}

function generatePlayerPosition(k, layer, player, map, gameElements) {
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
            continue;
        }
    }
}

function addProject(boundary, projects) {
    projects.push({
        name: boundary.name,
        discovered: false,
    });
}
