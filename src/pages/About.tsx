import { FaArrowUpRightFromSquare } from "react-icons/fa6";
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
                text="Hi there, I'm Volkan. I completed the 42 Paris cursus, and I am looking for my first work experience in game development or software development.
                    I love learning new things and enjoy experimenting with fun ideas while coding. And of course, I love playing video games!"
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
                text="I'm working on a 2D side-scrolling platformer metroidvania game using C# and Unity."
            />
            <Section header="Resumes" text="Here you can find my resumes." />
            <div className="flex flex-row gap-2 items-center ">
                <a
                    href="https://flowcv.com/resume/8esu2vmsetka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg 
                    bg-cyan-900/60 border border-cyan-800 text-sm font-medium text-cyan-200 
                    hover:bg-cyan-800/80 hover:text-cyan-100 transition focus:ring-2 focus:ring-cyan-700"
                >
                    Game Developer Resume
                    <FaArrowUpRightFromSquare className="ms-1" />
                </a>
                <a
                    href="https://flowcv.com/resume/olkim3dqig79"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg 
                    bg-cyan-900/60 border border-cyan-800 text-sm font-medium text-cyan-200 
                    hover:bg-cyan-800/80 hover:text-cyan-100 transition focus:ring-2 focus:ring-cyan-700"
                >
                    Software Engineer Resume
                    <FaArrowUpRightFromSquare className="ms-1" />
                </a>
            </div>
            <Footer />
        </>
    );
}

export default About;
