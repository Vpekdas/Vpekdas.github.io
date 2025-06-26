import { useState } from "react";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";

function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="rounded-xl shadow-lg bg-gradient-to-b from-cyan-900 to-blue-950 border-b-4 border-yellow-600 backdrop-blur-md text-cyan-200">
            <div className="flex flex-wrap max-w-screen-xl mx-auto p-4 items-center justify-between ">
                <Link to="/" className="flex gap-3 items-center ">
                    <img src="/assets/Avatar.webp" className="h-8" alt="Home Logo" />
                    <span className="text-2xl text-cyan-100 font-semibold whitespace-nowrap">Portfolio</span>
                </Link>
                <div className="hidden md:block">
                    <ul className="flex space-x-8 font-semibold">
                        <Tabs title={"Immersive Portfolio"} link={"/immersive-portfolio"} />
                        <Tabs title={"About"} link={"/about"} />
                        <Tabs title={"Projects"} link={"/projects"} />
                        <Tabs title={"Contact"} link={"/contact"} />
                    </ul>
                </div>
                <button
                    className="flex md:hidden items-center"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Open menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                </button>
            </div>
            {open && (
                <div className="px-4 pb-4 md:hidden">
                    <ul className="flex flex-col space-y-4 font-semibold">
                        <Tabs title={"Immersive Portfolio"} link={"/immersive-portfolio"} />
                        <Tabs title={"About"} link={"/about"} />
                        <Tabs title={"Projects"} link={"/projects"} />
                        <Tabs title={"Contact"} link={"/contact"} />
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
