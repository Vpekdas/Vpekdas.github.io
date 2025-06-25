import React from "react";

const NUM_BUBBLES = 42;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const Bubbles: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        {Array.from({ length: NUM_BUBBLES }).map((_, i) => {
            const radius = random(4, 16);
            const cx = random(0, 200);
            const delay = random(0, 7);
            const duration = random(5, 12);
            const opacity = random(0.2, 0.6);
            return (
                <circle
                    key={i}
                    className="bubble"
                    cx={cx}
                    cy={200 + radius}
                    r={radius}
                    fill="#BAE6FF"
                    style={{
                        opacity,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                        filter: `blur(${random(0, 1.5)}px)`,
                    }}
                />
            );
        })}
    </svg>
);

export default Bubbles;
