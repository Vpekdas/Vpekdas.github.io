import React from "react";

const ProjectTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <h5
            className="drop-shadow-[0_4px_24px_rgba(34,211,238,0.7)] bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-100 bg-clip-text 
            text-2xl font-extrabold text-transparent tracking-wider text-center"
        >
            {title}
        </h5>
    );
};

export default ProjectTitle;
