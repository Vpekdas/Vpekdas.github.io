import Technologies from "../components/Card/About/Technologies";
import NavBar from "../components/NavBar/NavBar";
import Section from "../components/Section";
import Timeline from "../components/Timeline/Timeline";
import type { TimelineListProps } from "../components/Timeline/Timeline";
import { profile } from "../constants";
import { IoSchool } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";

const favoriteTech = profile.favoriteTech;

const timelineList: TimelineListProps = {
    timelineProps: [
        {
            time: "August 2025",
            header: "42",
            description: "Student at 42",
            link: "#",
            icon: <IoSchool />,
            latest: true,
        },
        {
            time: "January 2022",
            header: "Axa France",
            description: "Working as accountant",
            link: "#",
            icon: <MdOutlineWork />,
            latest: false,
        },
        {
            time: "August 2025",
            header: "DSCG",
            description: "Master degree in accounting and management",
            link: "#",
            icon: <IoSchool />,
            latest: false,
        },
        {
            time: "August 2025",
            header: "DCG",
            description: "License degree in accounting and management",
            link: "#",
            icon: <IoSchool />,
            latest: false,
        },
    ],
};

function About() {
    return (
        <>
            <NavBar />
            <Section
                header="Who Am I ?"
                text="Hi there, Im Volkan, i finished 42 Paris cursus and im looking to become a game developer ! 
                I speak French, English and Turkish. Before this, i graduated from accouting ang management. I like to learn new thing and try fun things while i'm coding"
            />
            <Timeline timelineProps={timelineList.timelineProps} />
            <Section
                header="Skills"
                text="I’ve explored a variety of languages and frameworks since i started 42. My journey began with C and C++,
                followed by C#. On the web side, I started with JavaScript, HTML, and CSS (using Bootstrap), and later
                learned TypeScript and React. Along the way, I also picked up Docker and Unity. Here you can find my best stacks"
            />
            <Technologies technologies={favoriteTech} title={""} icon={null} />
            <Section
                header="What Im doing now ?"
                text="I earned 2 credits in Unity learning so now, its time to code my first game. At the same time im tryting
                to get a first experince in game developement indsutry."
            />
            <Section
                header="Resume"
                text="Here you can find me resume"
            />
        </>
    );
}

export default About;
