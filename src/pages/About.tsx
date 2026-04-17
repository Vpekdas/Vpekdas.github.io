import Technologies from "../components/Card/About/Technologies";
import NavBar from "../components/NavBar/NavBar";
import Section from "../components/Section";
import Timeline, { type TimelineList } from "../components/Timeline/Timeline";
import { profile } from "../constants";
import { IoSchool } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";

const favoriteTech = profile.favoriteTech;

const timelineList: TimelineList = {
    timelineProps: [
        {
            time: "2025 - 2026",
            header: "HeartBeat Games",
            description: "Worked as a Junior Game Developer during a 6-month internship.",
            icon: <MdOutlineWork />,
            latest: true,
        },
        {
            time: "2025",
            header: "42 Paris",
            description: "Finished the 42 common core.",
            link: "https://42.fr/",
            icon: <IoSchool />,
            latest: false,
        },
        {
            time: "2023",
            header: "42 Paris",
            description: "Completed the piscine and started the common core at 42 Paris.",
            link: "https://42.fr/",
            icon: <IoSchool />,
            latest: false,
        },
        {
            time: "2020 - 2023",
            header: "Axa France",
            description:
                "Worked as a Technician Accountant in apprenticeship, then one year on a fixed-term contract (CDD).",
            icon: <MdOutlineWork />,
            latest: false,
        },
        {
            time: "2020 - 2022",
            header: "CFA Bessières",
            description: "Master’s degree (DSCG) in accounting and management.",
            link: "https://www.cfa-bessieres.org/",
            icon: <IoSchool />,
            latest: false,
        },
        {
            time: "2018 - 2020",
            header: "ENC Bessières",
            description: "Bachelor’s degree (DCG) in accounting and management.",
            link: "https://www.enc-bessieres.org/",
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
                text="Hi there, I'm Volkan. I earned my Master’s degree (DSCG) in accounting and learned programming by completing the core curriculum at École 42.
                I prefer to pursue a developer path for passion, nonetheless accounting can be interesting sometimes :). I’m focusing mainly on game development-related projects."
            />
            <Timeline timelineProps={timelineList.timelineProps} />
            <Section
                header="Skills"
                text="I'm mainly programming in object-oriented languages such as C++, C#, and Luau, sometimes TypeScript. As for game engines, I love Unity, but using other engines like Godot or Unreal Engine 5 doesn’t bother me. Nonetheless, I'm enjoying learning new tech stacks and new languages."
            />
            <Technologies technologies={favoriteTech} title={""} icon={null} />
            <Section
                header="What Am I Doing Now?"
                text="Helping a friend on a Minecraft-like game in C++ and wgpu. Coding my own game in Unity, and building an app in React Native for chartered accountant students."
            />{" "}
            <Footer />
        </>
    );
}

export default About;
