import type { ReactNode } from "react";
import Bubbles from "./Bubbles";
import Noise from "./Noise";

function Background({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-cyan-900 via-blue-950 to-slate-900 overflow-hidden">
            <main className="relative p-6 m-8 z-20 rounded-xl shadow-lg bg-white/10 backdrop-blur-md">
                {children}
            </main>
            <Noise
                className="absolute inset-0 z-0 w-full h-full pointer-events-none"
                frequency={0.04}
                octaves={4}
                brightness={1}
                opacity={0.04}
                contrast={1.3}
            />
            <Bubbles className="absolute inset-0 z-0 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 z-10 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        </div>
    );
}

export default Background;
