import React from "react";

const NUM_BUBBLES = 42;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const Bubbles: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        {Array.from({ length: NUM_BUBBLES }).map((_, i) => {
            const radius = random(1, 16);
            const cx = random(0, 200);
            const delay = random(0, 7);
            const duration = random(6, 16);
            const opacity = random(0.1, 1.0);

            return (
                <circle
                    key={i}
                    className="bubble"
                    cx={cx}
                    cy={200 * 1.8 - radius}
                    r={radius}
                    fill="#BAE6FF"
                    style={{
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                        filter: `blur(${random(0, 1.5)}px)`,
                        ["--bubble-travel" as string]: `${random(200, 360)}px`,
                        ["--bubble-opacity" as string]: opacity,
                    }}
                />
            );
        })}
    </svg>
);

export default Bubbles;
