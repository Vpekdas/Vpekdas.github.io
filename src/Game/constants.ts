export const SCALE_FACTOR = 2;
export const OFFSET_X = 20;
export const OFFSET_Y = 20;
export const PLAYER_SPEED = 300;
export const BACKGROUND_COUNT = 5;
export const INDICATOR_OFFSET = 8;
export const DOOR_OFFSET = 32;

export const DEF_SCALE_IND = [
    { name: "topLeft", x: 1, y: 1 },
    { name: "topRight", x: 1, y: 1 },
    { name: "bottomLeft", x: 1, y: 1 },
    { name: "bottomRight", x: 1, y: 1 },
];

export const HOVER_EVENTS = [
    {
        name: "so_long",
        bubbleX: 300,
        bubbleY: 150,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 390,
        textY: 160,
    },
    {
        name: "philosophers",
        bubbleX: 350,
        bubbleY: 150,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 400,
        textY: 160,
    },
    {
        name: "minishell",
        bubbleX: 350,
        bubbleY: 210,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 420,
        textY: 220,
    },
];

export type ProjectKey = "so_long";

interface ProjectDescription {
    title: string;
    story: string;
    achievement: string;
    icon: string;
}

export const PROJECT_DESCRIPTIONS: Record<ProjectKey, ProjectDescription> = {
    so_long: {
        title: `The Grid Runner`,
        story: `In the heart of the neon city's digital maze, you embarked on <a href="https://github.com/Vpekdas/so_long" target="_blank">so_long</a>, a daring adventure to navigate through the intricate circuits of the cyber grid. This journey tested your skills in creating and manipulating graphical environments, challenging you to outsmart the system's guardians.`,
        achievement: `Became a master of strategy and graphical manipulation.`,
        icon: `/achievement/so_long.png`,
    },
};
