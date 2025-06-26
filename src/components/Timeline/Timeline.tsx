import React from "react";
import type { TimelineProps } from "./TimelineItem";
import TimelineItems from "./TimelineItem";

export interface TimelineListProps {
    timelineProps: TimelineProps[];
}

const Timeline: React.FC<TimelineListProps> = ({ timelineProps }) => {
    return (
        <ol className="relative border-s border-cyan-200">
            {timelineProps.map((timeline, index) => (
                <TimelineItems
                    key={index}
                    time={timeline.time}
                    header={timeline.header}
                    description={timeline.description}
                    link={timeline.link}
                    icon={timeline.icon}
                    latest={timeline.latest}
                />
            ))}
        </ol>
    );
};

export default Timeline;
