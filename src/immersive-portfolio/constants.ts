export const SCALE_FACTOR = 2;
export const OFFSET_X = 20;
export const OFFSET_Y = 20;
export const PLAYER_SPEED = 300;
export const CLOUD_SPEED = 105;
export const BACKGROUND_SCALE = 3;
export const BACKGROUND_COUNT = 5;
export const INDICATOR_OFFSET = 8;
export const DOOR_OFFSET = 32;

// sprite.width() return sometimes 0, so I have decided to look myself for the width and height.
export const BACKGROUND_W = 576;
export const BACKGROUND_H = 324;

export const TEXT_WIDTH = 100;
export const TEXT_SIZE = 20;
export const TEXT_SCALE = 0.7;


export const DEF_SCALE_IND = [
    { name: "topLeft", x: 1, y: 1 },
    { name: "topRight", x: 1, y: 1 },
    { name: "bottomLeft", x: 1, y: 1 },
    { name: "bottomRight", x: 1, y: 1 },
];

export type ProjectKey = "so_long" | "philosophers" | "minishell" | "unity" | "webserv" | "scop" | "ft_transcendance";

interface ProjectDescription {
    title: string;
    description: string;
}

export const PROJECT_DESCRIPTIONS: Record<ProjectKey, ProjectDescription> = {
    so_long: {
        title: "so_long",
        description: "description",
    },
    philosophers: {
        title: "philosophers",
        description: "description",
    },
    minishell: {
        title: "minishell",
        description: "description",
    },
    unity: {
        title: "unity",
        description: "description",
    },
    webserv: {
        title: "webserv",
        description: "description",
    },
    scop: {
        title: "scop",
        description: "description",
    },
    ft_transcendance: {
        title: "ft_transcendance",
        description: "description",
    },
};
