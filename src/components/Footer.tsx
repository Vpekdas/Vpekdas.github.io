import { profile } from "../constants";

function Footer() {
    return (
        <footer
            className="w-full bg-gradient-to-b from-blue-950/80 via-cyan-900/80 to-blue-800/70 border-t-2 border-cyan-800/60 py-6 mt-16 
            backdrop-blur transition-all duration-1000 ease-out"
        >
            <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/Vpekdas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 hover:underline hover:text-white"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/volkan-pekdas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 hover:underline hover:text-white"
                    >
                        LinkedIn
                    </a>
                    <a href="vopekdas@student.42.fr" className=" text-cyan-200 hover:underline hover:text-white">
                        Email
                    </a>
                </div>
                <p className="text-sm text-cyan-100 text-center">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
                <p className="text-xs text-center">
                    <span className="text-cyan-100">Made with </span>
                    <a className="text-cyan-300 font-semibold mx-1 hover:underline" href="https://react.dev/">
                        React
                    </a>
                    <span className="text-cyan-100">&amp;</span>
                    <a className="text-sky-400 font-semibold mx-1 hover:underline" href="https://tailwindcss.com/">
                        Tailwind CSS
                    </a>
                    <span className="text-cyan-100">&amp;</span>
                    <a className="text-fuchsia-400 font-semibold mx-1 hover:underline" href="https://vite.dev/">
                        Vite
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
