import cppLogo from "/assets/logo/cpp.svg";
import csLogo from "/assets/logo/cs.svg";
import unityLogo from "/assets/logo/unity.svg";
import linkedinLogo from "/assets/logo/linkedin.svg";
import discordLogo from "/assets/logo/discord.svg";
import fortyTwoLogo from "/assets/logo/42.svg";
import githubLogo from "/assets/logo/github.svg";
import openglLogo from "/assets/logo/opengl.svg";
import cmakeLogo from "/assets/logo/cmake.svg";
import cLogo from "/assets/logo/c.svg";
import tsLogo from "/assets/logo/typescript.svg";
import viteLogo from "/assets/logo/vite.svg";
import reactLogo from "/assets/logo/react.svg";
import tailwindLogo from "/assets/logo/tailwindcss.svg";
import pythonLogo from "/assets/logo/python.svg";
import jsLogo from "/assets/logo/javascript.svg";
import bootstrapLogo from "/assets/logo/bootstrap.svg";
import threejsLogo from "/assets/logo/threejs.svg";
import dockerLogo from "/assets/logo/docker.svg";

import type { ProjectCardProps } from "./components/Card/Project/ProjectCard";

export type TagType = "domain" | "mode" | "status";

export const profile = {
    name: "Volkan Pekdas",
    job: "Junior Unity Game Developer",
    heroPath: "/assets/Avatar.webp",
    avatarPath: "https://cdn.intra.42.fr/users/c5377b67724a79c195a65b3cac642622/vopekdas.jpg",
    bio: "Forged in the depths of Sufokia, I code the abyss into playful worlds.",
    location: "Sufokia, The Abyss",
    favoriteTech: [
        { src: cppLogo, alt: "C++ logo", title: "C++" },
        { src: csLogo, alt: "C# logo", title: "C#" },
        { src: unityLogo, alt: "Unity logo", title: "Unity" },
    ],
    socials: {
        props: [
            {
                src: linkedinLogo,
                alt: "LinkedIn logo",
                title: "LinkedIn",
                url: "https://linkedin.com/in/volkan-pekdas",
            },
            {
                src: discordLogo,
                alt: "Discord logo",
                title: "Discord",
                url: "https://discordapp.com/users/415118435174055947",
            },
            { src: fortyTwoLogo, alt: "42 logo", title: "42", url: "https://profile.intra.42.fr/users/vopekdas" },
            { src: githubLogo, alt: "Github logo", title: "Github", url: "https://github.com/Vpekdas" },
        ],
        header: true,
    },
    funFact: "blub... glub... bluuub blop... glub glub...",
};

export const FEATURED_PROJECTS: ProjectCardProps[] = [
    {
        image: {
            path: "project/unity.png",
            alt: "unity-junior-programmer image",
        },
        title: "Unity Junior Programmer",
        technologies: [
            {
                src: csLogo,
                alt: "C# Logo",
                title: "C#",
            },
            {
                src: unityLogo,
                alt: "Unity Logo",
                title: "Unity",
            },
        ],
        description:
            "This project marks my first adventure with Unity and C#. It’s a collection of early prototypes that helped me master the fundamentals of game development using Unity and C#.",
        tags: [
            {
                text: "Graphics",
                type: "domain",
            },
            {
                text: "Solo",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/unity-junior-programmer",
    },
    {
        image: {
            path: "project/scop.png",
            alt: "scop image",
        },
        title: "Scop",
        technologies: [
            {
                src: cppLogo,
                alt: "C++ Logo",
                title: "C++",
            },
            {
                src: openglLogo,
                alt: "OpenGL Logo",
                title: "OpenGL",
            },
            {
                src: cmakeLogo,
                alt: "CMake Logo",
                title: "Cmake",
            },
        ],
        description:
            "This project marks my first experience with graphical programming and using a graphics API like OpenGL. Its purpose is to render any .obj file, apply textures, and allow rotation of the model along all three axes.",
        tags: [
            {
                text: "Graphics",
                type: "domain",
            },
            {
                text: "Solo",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/scop",
    },
    {
        image: {
            path: "project/so_long.png",
            alt: "scop image",
        },
        title: "so_long",
        technologies: [
            {
                src: cLogo,
                alt: "C Logo",
                title: "C",
            },
        ],
        description:
            "My first game development project at 42—this is where it all began! I learned how to program a simple game using a basic graphics library. The result is a 2D platformer in which you must avoid or defeat enemies and collect coins.",
        tags: [
            {
                text: "Graphics",
                type: "domain",
            },
            {
                text: "Solo",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/so_long",
    },
];

export const OTHER_PROJECTS: ProjectCardProps[] = [
    {
        image: {
            path: "project/Vpekdas.github.io.png",
            alt: "Vpekdas.github.io image",
        },
        title: "Portfolio",
        technologies: [
            {
                src: tsLogo,
                alt: "TypeScript Logo",
                title: "TypeScript",
            },
            {
                src: reactLogo,
                alt: "React Logo",
                title: "React",
            },
            {
                src: tailwindLogo,
                alt: "Tailwindcss Logo",
                title: "Tailwindcss",
            },
            {
                src: viteLogo,
                alt: "Vite Logo",
                title: "Vite",
            },
        ],
        description:
            "My portfolio, built with TypeScript, React, TailwindCSS, and Vite. Through this project, I learned how to use the open Kaplay library to create an immersive portfolio experience.",
        tags: [
            {
                text: "Web",
                type: "domain",
            },
            {
                text: "Solo",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/Vpekdas.github.io",
    },
    {
        image: {
            path: "project/ft_transcendance.png",
            alt: "ft_transcendance image",
        },
        title: "ft_transcendance",
        technologies: [
            {
                src: jsLogo,
                alt: "JavaScript Logo",
                title: "JavaScript",
            },
            {
                src: pythonLogo,
                alt: "Python Logo",
                title: "Python",
            },
            {
                src: bootstrapLogo,
                alt: "Bootstrap Logo",
                title: "Bootstrap",
            },
            {
                src: threejsLogo,
                alt: "Three.js Logo",
                title: "Three.js",
            },
            {
                src: dockerLogo,
                alt: "Docker Logo",
                title: "Docker",
            },
        ],
        description:
            "My first web development project with 2 teammates. The goal was to build a Single Page Application (SPA) using only JavaScript, Bootstrap and Three.js, with Python (Django) for the backend. We implemented a Pong game with multiple modes, integrated chat, and a user management system, all featuring a stylish and inspired design.",
        tags: [
            {
                text: "Web",
                type: "domain",
            },
            {
                text: "Group",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/ft_transcendence",
    },
    {
        image: {
            path: "project/webserv.png",
            alt: "webserv image",
        },
        title: "webserv",
        technologies: [
            {
                src: cppLogo,
                alt: "C++ Logo",
                title: "C++",
            },
        ],
        description:
            "This project aims to help us understand how the HTTP protocol works and how I/O management is handled. We created a web server that can serve static pages when requested by a browser. Multiple routes, methods, and ports can be configured. The server also supports directory listing and custom error pages.",
        tags: [
            {
                text: "Unix",
                type: "domain",
            },
            {
                text: "Network",
                type: "domain",
            },
            {
                text: "Group",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/webserv",
    },
    {
        image: {
            path: "project/philosophers.png",
            alt: "philosophers image",
        },
        title: "philosophers",
        technologies: [
            {
                src: cLogo,
                alt: "C Logo",
                title: "C",
            },
        ],
        description:
            "This project aims to teach multithreading concepts by simulating the Dining Philosophers problem using mutexes. Proper management of mutexes is crucial for the philosophers to survive, as it helps prevent data races and ensures safe creation and synchronization of threads.",
        tags: [
            {
                text: "Unix",
                type: "domain",
            },
            {
                text: "Solo",
                type: "mode",
            },
            {
                text: "Finished",
                type: "status",
            },
        ],
        href: "https://github.com/Vpekdas/philosophers",
    },
];
