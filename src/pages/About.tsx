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
            time: "2025",
            header: "42 Paris",
            description: "Finished the 42 common core.",
            link: "https://42.fr/",
            icon: <IoSchool />,
            latest: true,
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
                text="Hi there, I'm Volkan. Passionate about numbers, I earned my Master’s degree (DSCG) in accounting and learned programming by completing the core curriculum at École 42.
                I’m currently pursuing the Chartered Professional Accountant (DEC) path, with the goal of combining my skills in accounting and software development. And of course, I love playing video games!"
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
                header="What Am I Doing Now?"
                text="Participating in Game Jams"
            />
            <Footer />
        </>
    );
}

export default About;
