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
                        href={profile.socials[3].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 hover:underline hover:text-white"
                    >
                        GitHub
                    </a>
                    <a
                        href={profile.socials[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 hover:underline hover:text-white"
                    >
                        LinkedIn
                    </a>
                    <a href="mailto:your@email.com" className=" text-cyan-200 hover:underline hover:text-white">
                        Email
                    </a>
                </div>
                <p className="text-sm text-cyan-100 text-center">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
                <p className="text-xs text-center">
                    <span className="text-cyan-100">Made with </span>
                    <span className="text-cyan-300 font-semibold mx-1">React</span>
                    <span className="text-cyan-100">&amp;</span>
                    <span className="text-sky-400 font-semibold mx-1">Tailwind CSS</span>
                    <span className="text-cyan-100">&amp;</span>
                    <span className="text-fuchsia-400 font-semibold mx-1">Vite</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
