import type { ReactNode } from "react";
import Bubbles from "./Bubbles";

type BackgroundProps = {
    children: ReactNode;
};

function Background({ children }: BackgroundProps) {
    return (
        <div className="bg-gradient-to-b from-cyan-900 via-blue-950 to-slate-900 min-h-screen relative overflow-hidden">
            {/* Bubbles Animation Layer */}
            <Bubbles className="absolute inset-0 z-0 pointer-events-none" />

            {/* Steampunk Gear Overlay */}
            {/* <img src="" alt="" className="absolute top-0 left-0 w-48 opacity-10 pointer-events-none" /> */}

            {/* Subtle Texture Layer */}
            {/* <div className="absolute inset-0 bg-[url('/assets/noise.svg')] bg-repeat opacity-10 pointer-events-none" /> */}

            {/* Light Rays Overlay */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10" />

            {/* Sufokia Accents */}
            {/* <img src="" alt="" className="absolute bottom-0 right-0 w-32 opacity-80 pointer-events-none" /> */}

            {/* Main Content with Glass Effect */}
            <main className="relative z-20 backdrop-blur-md bg-white/10 rounded-xl shadow-lg p-6 m-8">{children}</main>
        </div>
    );
}

export default Background;
