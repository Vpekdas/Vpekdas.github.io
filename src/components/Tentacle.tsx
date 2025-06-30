import { useEffect, useRef } from "react";
import { interpolate } from "flubber";

interface TentacleProps {
    id: string;
    initialPath: string;
    finalPath: string;
    color: string;
}

function Tentacle({ id, initialPath, finalPath, color }: TentacleProps) {
    const ref = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const interpForward = interpolate(initialPath, finalPath);
        const interpBackward = interpolate(finalPath, initialPath);

        let direction = 1;
        let startTime: number | null = null;
        const duration = 4000;

        function animatePath(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            let t = elapsed / duration;
            if (t > 1) t = 1;

            const eased = -(Math.cos(Math.PI * t) - 1) / 2;

            const interp = direction === 1 ? interpForward : interpBackward;
            ref.current!.setAttribute("d", interp(eased));

            if (t < 1) {
                requestAnimationFrame(animatePath);
            } else {
                direction *= -1;
                startTime = null;
                requestAnimationFrame(animatePath);
            }
        }

        requestAnimationFrame(animatePath);
    }, []);

    return <path id={id} ref={ref} fill={color} d={initialPath} />;
}

export default Tentacle;
