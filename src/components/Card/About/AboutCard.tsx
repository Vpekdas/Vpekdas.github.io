import React from "react";
import AvatarWIthTitle from "./AvatarWithTitle";
import Location from "./Location";
import Socials from "./Socials";
import FunFact from "./FunFact";
import Technologies from "./Technologies";
import { MdFavorite } from "react-icons/md";

type AboutCardProps = {
    name: string;
    job: string;
    path: string;
    bio: string;
    location: string;
    favoriteTech: { src: string; alt: string; title: string }[];
    socials: { src: string; alt: string; title: string; url: string }[];
    funFact: string;
};

const AboutCard: React.FC<AboutCardProps> = ({ name, job, path, bio, location, favoriteTech, socials, funFact }) => {
    return (
        <div
            className="squishy-card overflow-hidden
            mx-auto p-6
            w-full max-w-sm 
            rounded-2xl shadow-lg 
            bg-gradient-to-b from-blue-950/80 via-cyan-900/80 to-blue-800/70 border-2 border-cyan-800/60
            backdrop-blur"
        >
            <AvatarWIthTitle name={name} path={path} job={job} />
            <p className="mt-4 text-cyan-200/90 text-center italic">{bio}</p>
            <Location location={location} />
            <Technologies technologies={favoriteTech} title="Favorite Technologies" icon={<MdFavorite />} />
            <Socials socials={socials} />
            <FunFact funFact={funFact} />
        </div>
    );
};

export default AboutCard;
