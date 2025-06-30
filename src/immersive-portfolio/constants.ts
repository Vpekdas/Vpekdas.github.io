export const SCALE_FACTOR = 2;
export const BUBBLE_SCALE = 0.7;
export const BACKGROUND_SCALE = 3;

export const OFFSET_X = 20;
export const OFFSET_Y = 20;

export const PLAYER_SPEED = 300;
export const CLOUD_SPEED = 105;

export const INDICATOR_OFFSET = 8;
export const DOOR_OFFSET = 32;

// I needed the width and height of a background before using it, so sprite.width() could not be called.
// Even when creating temporary sprites, the value was sometimes 0 or correct.
// So, for consistency, I determine the width and height manually.
export const BACKGROUND_COUNT = 5;
export const BACKGROUND_W = 576;
export const BACKGROUND_H = 324;

export const TEXT_WIDTH = 100;
export const TEXT_SIZE = 24;
export const FONT_SIZE = 14;


/**
 * Default scale indicators for UI corners.
 * Each object represents a corner with its name with x, y coordinates.
 */
export const DEF_SCALE_IND = [
    { name: "topLeft", x: 1, y: 1 },
    { name: "topRight", x: 1, y: 1 },
    { name: "bottomLeft", x: 1, y: 1 },
    { name: "bottomRight", x: 1, y: 1 },
];

export type ProjectKey = "so_long" | "philosophers" | "minishell" | "unity" | "webserv" | "scop" | "ft_transcendance";

/**
 * Contains all projects, each with a title, description, and URL.
 */
export const PROJECT_DESCRIPTIONS: Record<ProjectKey, ProjectDescription> = {
    so_long: {
        title: "so_long",
        description:
            "First game development project during the 42 common core. The purpose was to learn how to use a simple graphical library in C. I made a 2D platformer and learned all my basics for game development here. (The poster resembles a pixel art game, which is why I included it here.)",

        url: "https://github.com/Vpekdas/so_long",
    },
    philosophers: {
        title: "philosophers",
        description:
            "This project taught me how to multithread a simple program, still written in C. The purpose was to simulate the dining philosophers problem and make them last as long as possible by efficiently managing their forks (mutexes in programming terms). (The table and spaghetti make it obvious where I should place this project.)",
        url: "https://github.com/Vpekdas/Philosophers",
    },
    minishell: {
        title: "minishell",
        description:
            "First big group project. The purpose was to create a small shell similar to Bash. It handles some built-in commands and basic inputs. It seemed scary at first, but not so much once it's behind you. (It's a sink because 'shell' reminds me of seashells, and C shell, get the joke?)",
        url: "https://github.com/Vpekdas/minishell",
    },
    unity: {
        title: "unity",
        description:
            "Aaaa, finally an interesting game development project! In this one, I learned how to code basic games and core concepts with Unity, and I even earned a badge! I created plenty of prototypes. My journey as a game developer probably began here. (It's shown on a computer because I spent most of my time programming on one.)",
        url: "https://github.com/Vpekdas/unity-junior-programmer",
    },
    webserv: {
        title: "webserv",
        description:
            "First actual C++ project. Unfortunately, it was done in C++98, but it was still a great opportunity to learn the basics and discover new features and concepts. The idea was to try to replicate some features of Nginx and create a basic web server. You can open your browser and try requesting some static pages. (Didn’t know where to put it, but since the case looks techy, it found its place here.)",
        url: "https://github.com/Vpekdas/webserv",
    },
    scop: {
        title: "scop",
        description:
            "First project with a graphical API and shader programming wouhouu! The idea of this project was to render a .obj model and apply a texture to it. So I chose C++20, OpenGL, and SDL, as I heard they were the easiest for learning graphical programming. (It's a window because 'scop' reminds me that it's cool to look outside while programming sometimes.)",
        url: "https://github.com/Vpekdas/scop",
    },
    ft_transcendance: {
        title: "ft_transcendance",
        description:
            "Tadaaa, the last project of the common core and the gateway to post-common core projects. The idea was to create a SPA with a Pong game inside it. We used Bootstrap, Django, and ThreeJS, no libraries like React that could do the work for you were allowed. I had a lot of fun with this one. (It's on a gate because it's the end of one chapter and the start of a new one!)",
        url: "https://github.com/Vpekdas/ft_transcendence",
    },
};

/**
 * Represents a project description.
 */
interface ProjectDescription {
    /** The title of the project. */
    title: string;
    /** A brief description of the project. */
    description: string;
    /** The URL of the project. */
    url: string;
}
