import React from "react";
import type { TimelineProps } from "./TimelineItem";
import TimelineItems from "./TimelineItem";
import { guidGenerator } from "../../id";

export interface TimelineList {
    timelineProps: TimelineProps[];
}

const Timeline: React.FC<TimelineList> = ({ timelineProps }) => {
    return (
        <ol className="relative border-s border-cyan-200">
            {timelineProps.map((timeline) => (
                <TimelineItems
                    key={guidGenerator()}
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
