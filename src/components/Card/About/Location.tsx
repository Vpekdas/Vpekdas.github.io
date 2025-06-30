import React from "react";
import { IoLocation } from "react-icons/io5";

const Location: React.FC<{ location: string }> = ({ location }) => {
    return (
        <div className="flex gap-2 mt-4 text-cyan-400 items-center justify-center ">
            <IoLocation />
            <span className="text-cyan-300 text-sm">{location}</span>
        </div>
    );
};

export default Location;
