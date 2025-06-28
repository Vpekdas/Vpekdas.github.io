import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export interface TimelineProps {
    time: string;
    header: string;
    description: string;
    link: string;
    icon: React.ReactNode;
    latest: boolean;
}



const TimelineItem: React.FC<TimelineProps> = ({ time, header, description, link, icon, latest }) => {
    return (
        <li className="mb-10 ms-6">
            <span className="absolute flex w-8 h-8 -start-5 bg-gradient-to-br from-blue-950 via-cyan-900 to-blue-800 rounded-full ring-4 ring-cyan-800/60 shadow-lg items-center justify-center text-cyan-200 text-xl">
                {icon}
            </span>
            <h3 className="flex mb-1 text-lg font-semibold text-cyan-400/90 italic items-center">
                {header}
                {latest && (
                    <span className="me-2 ms-3 px-2.5 py-0.5 rounded-sm bg-blue-100 text-blue-800 font-medium text-sm">
                        Latest
                    </span>
                )}
            </h3>
            <time className="block mb-2 text-sm text-cyan-300/80 font-mono">{time}</time>
            <p className="mb-4 text-base font-normal text-cyan-200/80">{description}</p>
            <a
                href={link}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg 
                    bg-cyan-900/60 border border-cyan-800 text-sm font-medium text-cyan-200 
                    hover:bg-cyan-800/80 hover:text-cyan-100 transition focus:ring-2 focus:ring-cyan-700"
            >
                Learn more
                <FaArrowUpRightFromSquare className="ms-1" />
            </a>
        </li>
    );
};

export default TimelineItem;
