import React from "react";

// https://noice.vercel.app/

const Noise: React.FC<{
    className: string;
    frequency: number;
    octaves: number;
    brightness: number;
    opacity: number;
    contrast: number;
}> = ({ className, frequency, octaves, brightness, opacity, contrast }) => {
    const contrastIntercept = 0.5 - 0.5 * contrast;

    return (
        <svg className={className}>
            <filter id="noise-filter">
                <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={octaves} stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                    <feFuncR type="linear" slope={brightness} />
                    <feFuncG type="linear" slope={brightness} />
                    <feFuncB type="linear" slope={brightness} />
                    <feFuncA type="linear" slope={opacity} />
                </feComponentTransfer>
                <feComponentTransfer>
                    <feFuncR type="linear" slope={contrast} intercept={contrastIntercept} />
                    <feFuncG type="linear" slope={contrast} intercept={contrastIntercept} />
                    <feFuncB type="linear" slope={contrast} intercept={contrastIntercept} />
                </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-filter)" />
        </svg>
    );
};

export default Noise;
