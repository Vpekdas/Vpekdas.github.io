import React from "react";
import { useInView } from "react-intersection-observer";
import { FaTools } from "react-icons/fa";
import Technologies from "../About/Technologies";
import ProjectImage from "./ProjectImage";
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";
import ProjectTag from "./ProjectTag";
import ProjectButton from "./ProjectButton";
import type { TagType } from "../../../constants";

export interface ProjectCardProps {
    image: { path: string; alt: string };
    title: string;
    technologies: { src: string; alt: string; title: string }[];
    description: string;
    tags: { text: string; type: TagType }[];
    href: string;
    style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, technologies, description, tags, href, style }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <div
            ref={ref}
            style={style}
            className={`w-full max-w-sm mx-auto p-6 mt-10 rounded-2xl shadow-lg overflow-hidden
                bg-gradient-to-b from-blue-950/80 via-cyan-900/80 to-blue-800/70
                border-2 border-cyan-800/60 backdrop-blur
                transition-all ease-out
                hover:scale-105 hover:shadow-[0_8px_50px_0_rgba(34,210,255,0.2)] hover:border-cyan-400 hover:bg-gradient-to-b hover:from-cyan-600/80 transition-transform"
                ${
                    inView
                        ? "opacity-100 translate-y-0 blur-0 water-pop"
                        : "opacity-40 translate-y-24 blur-sm bg-blue-900/60"
                }`}
        >
            <div className="squishy flex flex-col space-y-4">
                <ProjectImage path={image.path} alt={image.alt} />
                <ProjectTitle title={title} />
                <Technologies technologies={technologies} title="Technologies Used" icon={<FaTools />} />
                <ProjectDescription description={description} />
                <div className="flex flex-wrap gap-2 justify-center ">
                    {tags.map((tag) => (
                        <ProjectTag key={`${tag.type}:${tag.text}`} text={tag.text} type={tag.type} />
                    ))}
                </div>
                <ProjectButton href={href} />
            </div>
        </div>
    );
};

export default ProjectCard;
