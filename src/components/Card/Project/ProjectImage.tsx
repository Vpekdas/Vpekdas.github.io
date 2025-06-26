import React from "react";

const ProjectImage: React.FC<{ path: string; alt: string }> = ({ path, alt }) => {
    return (
        <div className="w-auto h-auto mx-auto">
            <img
                className="w-full h-full object-contain rounded-t-lg shadow-lg shadow-cyan-400/40 border border-cyan-400"
                src={path}
                alt={alt}
            />
        </div>
    );
};

export default ProjectImage;
