import React, { type ReactNode } from "react";

// position, display, flex/grid, gap, overflow, z-index,
// margin, padding,
// width, max-width, height, max-height,
// rounded, shadow,
// bg, border,
// typography, effects,
// other,
// responsive overrides (sm:, md:, etc)

const Tooltip: React.FC<{ text: string; children: ReactNode }> = ({ text, children }) => (
    <div className="relative group">
        {children}
        <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 py-1 px-2 z-10 
                    shadow-lg rounded-xl
                    bg-gradient-to-br from-blue-300 via-cyan-300 to-blue-100 
                    text-blue-900 text-xs whitespace-nowrap 
                    opacity-0 group-hover:opacity-100 transition"
        >
            {text}
        </div>
    </div>
);

export default Tooltip;
