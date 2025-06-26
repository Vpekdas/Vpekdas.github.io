import React from "react";
import DecodeEffect from "./DecodeText";

const Section: React.FC<{ header: string; text?: string }> = ({ header, text }) => {
    return (
        <>
            <h1
                className="floating-header mb-4 drop-shadow-lg 
                bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-900 bg-clip-text
                font-extrabold tracking-tight text-transparent lg:text-6xl"
            >
                {header}
            </h1>
            {text && (
                <p
                    className="shadow-sufokia-glow mb-8 px-3 py-1 rounded drop-shadow-lg
                bg-gradient-to-r from-cyan-800 via-cyan-700 to-blue-900 font-mono text-lg text-cyan-300"
                >
                    <DecodeEffect text={text} />
                </p>
            )}
        </>
    );
};

export default Section;
