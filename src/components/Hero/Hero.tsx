import Avatar from "../Avatar";
import HeroButton from "./HeroButton";

import React from "react";

const Hero: React.FC<{ name: string; job: string; path: string }> = ({ name, job, path }) => {
    return (
        <div className="px-4 py-24 mx-auto max-w-screen-xl text-center lg:py-56 ">
            <h1
                className="mb-4 drop-shadow-lg 
                bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-900 bg-clip-text
                font-extrabold tracking-tight text-transparent lg:text-6xl "
            >
                {name} | {job}
            </h1>
            <Avatar path={path} />
            <p className="mb-8 drop-shadow-sm text-lg font-mono text-cyan-200">
                Adventurer, welcome to the abyss.
                <br />
                You can explore freely in this abyss, try not to sink too deep 🤿.
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <HeroButton to="/projects" text="🤿 Dive Deeper" />
                <HeroButton to="/contact" text="🪝 Reach me" />
            </div>
        </div>
    );
};

export default Hero;
