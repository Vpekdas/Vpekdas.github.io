import React from "react";

type TagType = "domain" | "mode" | "status";

const getStatusStyle = (text: string) => {
    if (text.toLowerCase() === "finished") {
        return "bg-green-100 text-green-800";
    }
    if (text.toLowerCase() === "ongoing") {
        return "bg-yellow-100 text-yellow-800";
    } else {
        return "bg-gray-100 text-gray-800";
    }
};

const getModeStyle = (text: string) => {
    if (text.toLowerCase() === "solo") {
        return "bg-purple-100 text-purple-800 ";
    }
    if (text.toLowerCase() === "group") {
        return "bg-pink-100 text-pink-800";
    } else {
        return "bg-gray-100 text-gray-800";
    }
};

const getDomainStyle = () => {
    return "bg-blue-100 text-blue-800";
};

const ProjectTag: React.FC<{ text: string; type: TagType }> = ({ text, type }) => {
    let style = "";
    if (type === "status") {
        style = getStatusStyle(text);
    } else if (type === "mode") {
        style = getModeStyle(text);
    } else {
        style = getDomainStyle();
    }
    return <span className={`me-2 px-2.5 py-0.5 rounded-sm text-xs font-medium ${style}`}>{text}</span>;
};

export default ProjectTag;
