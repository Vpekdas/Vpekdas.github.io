import React from "react";
import { IoShareSocial } from "react-icons/io5";

export interface SocialList {
    socialProps: SocialProps[];
    header: boolean;
}

export interface SocialProps {
    src: string;
    alt: string;
    title: string;
    url: string;
}

const Socials: React.FC<SocialList> = ({ socialProps, header }) => {
    return (
        <div className="mt-6">
            {header && (
                <p className="flex gap-2 mb-2 text-cyan-400 font-semibold text-center items-center justify-center">
                    <IoShareSocial />
                    Socials
                </p>
            )}
            <div className="flex flex-row gap-x-6 items-center justify-center">
                {socialProps.map((social) => (
                    <a
                        key={social.title}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.title}
                        className="flex w-10 h-10 rounded-full shadow-md bg-cyan-900/80 items-center justify-center hover:bg-cyan-700/70 transition-colors"
                    >
                        <img src={social.src} alt={social.alt} className="w-6 h-6" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Socials;
