import React from "react";
const Avatar: React.FC<{ path: string }> = ({ path }) => (
    <div className="squishy relative inline-block mx-auto">
        <img className="w-20 h-20 rounded-full md:w-32 md:h-32" src={path} alt="Avatar" />
        <span className="absolute inset-0 rounded-full shadow-[0_0_32px_8px_rgba(0,80,255,0.5)] pointer-events-none"></span>
    </div>
);

export default Avatar;
