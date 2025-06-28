import cppLogo from "/assets/logo/cpp.svg";
import csLogo from "/assets/logo/cs.svg";
import unityLogo from "/assets/logo/unity.svg";
import linkedinLogo from "/assets/logo/linkedin.svg";
import discordLogo from "/assets/logo/discord.svg";
import fortyTwoLogo from "/assets/logo/42.svg";
import githubLogo from "/assets/logo/github.svg";

export type TagType = "domain" | "mode" | "status";

export const profile = {
    name: "Volkan Pekdas",
    job: "Junior Game Developer",
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

export const testProject = {
    image: {
        path: "https://i.pinimg.com/736x/b1/2c/61/b12c61adcd4698337067d7672326edf2.jpg",
        alt: "Project description",
    },
    title: "Title",
    technologies: [
        { src: cppLogo, alt: "C++ logo", title: "C++" },
        { src: csLogo, alt: "C# logo", title: "C#" },
        { src: unityLogo, alt: "Unity logo", title: "Unity" },
    ],
    description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.l , but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with ",
    tags: [
        { text: "Gaming", type: "domain" as TagType },
        { text: "Solo", type: "mode" as TagType },
        { text: "Finished", type: "status" as TagType },
    ],
    href: "",
};
