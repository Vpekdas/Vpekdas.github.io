import React from "react";
import { Link, useLocation } from "react-router-dom";

const Tabs: React.FC<{ title: string; link: string }> = ({ title, link }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <li className="squishy">
            <Link
                to={link}
                className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive(link) ? "shadow bg-yellow-600 text-blue-950 " : "hover:bg-cyan-800 hover:text-yellow-200"
                }`}
            >
                {title}
            </Link>
        </li>
    );
};

export default Tabs;
