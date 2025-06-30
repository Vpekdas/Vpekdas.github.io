import React from "react";
import Tooltip from "../../Tooltip";
import { guidGenerator } from "../../../id";

const Technologies: React.FC<{
    technologies: { src: string; alt: string; title: string }[];
    title: string;
    icon: React.ReactNode;
}> = ({ technologies, title, icon }) => {
    return (
        <div className="mt-6">
            <p className="flex gap-2 mb-2  text-cyan-400 font-semibold items-center justify-center ">
                {icon}
                {title}
            </p>
            <div className="flex flex-row gap-x-6 items-center justify-center">
                {technologies.map((tech) => (
                    <Tooltip
                        key={guidGenerator()}
                        text={tech.title}
                        children={
                            <img
                                src={tech.src}
                                alt={tech.alt}
                                className="w-10 h-10 rounded-full shadow-lg bg-cyan-800/70 hover:scale-110 hover:ring-2 hover:ring-cyan-300 transition-transform"
                            />
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Technologies;
