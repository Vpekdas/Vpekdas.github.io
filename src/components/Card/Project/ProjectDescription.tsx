import React from "react";

const ProjectDescription: React.FC<{ description: string }> = ({ description }) => {
    return (
        <>
            <h5
                className="mb-2 
                bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-200 bg-clip-text 
                drop-shadow-[0_4px_24px_rgba(6,182,212,0.7)] 
                text-transparent text-3xl font-extrabold 
                tracking-wider text-center"
            >
                Description
            </h5>
            <p className="mt-4  text-cyan-200/90 italic text-center ">{description}</p>
        </>
    );
};

export default ProjectDescription;
