export const SCALE_FACTOR = 2;
export const OFFSET_X = 20;
export const OFFSET_Y = 20;
export const PLAYER_SPEED = 300;
export const BACKGROUND_COUNT = 5;
export const INDICATOR_OFFSET = 8;

export const DEF_SCALE_IND = [
    { name: "topLeft", x: 1, y: 1 },
    { name: "topRight", x: 1, y: 1 },
    { name: "bottomLeft", x: 1, y: 1 },
    { name: "bottomRight", x: 1, y: 1 },
];
export const FURNITURES = [
    { frame: 54, x: 0, y: 8 },
    { frame: 55, x: 16, y: 8 },
    { frame: 56, x: 32, y: 8 },
    { frame: 67, x: 0, y: 24 },
    { frame: 68, x: 16, y: 24 },
    { frame: 69, x: 32, y: 24 },
    { frame: 80, x: 0, y: 40 },
    { frame: 81, x: 16, y: 40 },
    { frame: 82, x: 32, y: 40 },
];
export const BOOKS = [
    { type: "book", x: 0, y: 0 },
    { type: "book2", x: 0, y: 24 },
];
export const HOVER_EVENTS = [
    {
        name: "libft",
        bubbleX: 500,
        bubbleY: 250,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 64,
        textX: 600,
        textY: 260,
    },
    {
        name: "get_next_line",
        bubbleX: 100,
        bubbleY: 20,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 150,
        textY: 35,
    },
    {
        name: "ft_printf",
        bubbleX: 200,
        bubbleY: 110,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 280,
        textY: 120,
    },
    {
        name: "pipex",
        bubbleX: 300,
        bubbleY: 350,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 400,
        textY: 360,
    },
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
        name: "push_swap",
        bubbleX: 450,
        bubbleY: 250,
        bubbleScale: 0.7,
        textSize: 26,
        textWidth: 250,
        textX: 520,
        textY: 260,
    },
];

export const PROJECT_DESCRIPTIONS = {
    libft: {
        title: `Neon Code Forger`,
        story: `In the neon-lit alleyways of Cyber City, you embarked on a quest to forge <a href="https://github.com/Vpekdas/libft" target="_blank">libft</a>, a powerful toolkit of neon code. Each function you crafted was a beacon in the digital darkness, arming you for the cyber battles in the realm of low-level programming.`,
        achievement: `Mastered the cyber arts of memory allocation, string manipulation, and data processing, becoming a legend in the neon code underworld.`,
    },
    get_next_line: {
        title: `The Datastream Navigator`,
        story: `In the sprawling data jungles of Neo-Tokyo, you uncovered <a href="https://github.com/Vpekdas/get_next_line" target="_blank">get_next_line</a>, a cyber spell to navigate the endless data streams. Your odyssey honed your skills in manipulating file descriptors and memory, essential for any cyber wizard.`,
        achievement: `Elevated your status in the cyber realm with unparalleled expertise in file manipulation and dynamic memory allocation.`,
    },
    ft_printf: {
        title: `The Cyber Scribe`,
        story: `Amidst the cybernetic chaos of the metropolis, you initiated the <a href="https://github.com/Vpekdas/ft_printf" target="_blank">ft_printf</a> project, an endeavor to recreate the ancient artifact known as 'printf'. Your mission was to encode the essence of digital expression, enabling the translation of thought into visible form across the neon screens.`,
        achievement: `Your creation became the standard for data expression in the cyber realm, bridging the gap between thought and digital manifestation.`,
    },
    pipex: {
        title: `The Protocol Weaver`,
        story: `In the labyrinth of the digital underweb, you discovered <a href="https://github.com/Vpekdas/pipex" target="_blank">pipex</a>, a clandestine project to weave the protocols of old and new. This quest plunged you into the depths of system calls and inter-process communication, challenging you to master the arcane arts of data piping.`,
        achievement: `Achieved mastery over the flow of data, becoming a revered architect of the underweb's information streams.`,
    },
    so_long: {
        title: `The Grid Runner`,
        story: `In the heart of the neon city's digital maze, you embarked on <a href="https://github.com/Vpekdas/so_long" target="_blank">so_long</a>, a daring adventure to navigate through the intricate circuits of the cyber grid. This journey tested your skills in creating and manipulating graphical environments, challenging you to outsmart the system's guardians.`,
        achievement: `Your game became a symbol of rebellion, teaching the denizens of the cyber world the value of strategy and perseverance.`,
    },
    push_swap: {
        title: `The Algorithmic Shuffler`,
        story: `Deep within the cybernetic core, you encountered <a href="https://github.com/Vpekdas/push_swap" target="_blank">push_swap</a>, a challenge of logic and efficiency. Tasked with sorting data in the least number of moves, this mission required you to delve into the realm of algorithms and data structures, pushing you to your limits.`,
        achievement: `Your algorithmic prowess not only streamlined the chaos of data but also set a new standard for computational efficiency in the cyber realm.`,
    },
};
