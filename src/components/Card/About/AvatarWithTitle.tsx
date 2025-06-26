import React from "react";
import { IoGameController } from "react-icons/io5";

const AvatarWIthTitle: React.FC<{ name: string; path: string; job: string }> = ({ name, path, job }) => {
    return (
        <div className="flex flex-col z-10 items-center">
            <div className="relative mb-3">
                <img
                    className="w-32 h-32 rounded-full shadow-xl bg-cyan-900/80  border-4 border-cyan-400/70"
                    src={path}
                    alt={`${name} avatar`}
                />
                <span className="absolute inset-0 rounded-full ring-2 ring-cyan-500/50 animate-pulse pointer-events-none"></span>
            </div>
            <div className="flex flex-col items-center">
                <h5
                    className="mb-0 
                    bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-100 bg-clip-text 
                    drop-shadow-[0_4px_24px_rgba(34,211,238,0.7)] 
                    text-3xl font-extrabold text-transparent tracking-wider text-center"
                >
                    {name}
                </h5>
            </div>
            <span className="flex gap-2 text-cyan-400/90 items-center ">
                <IoGameController />
                {job}
            </span>
        </div>
    );
};

export default AvatarWIthTitle;
