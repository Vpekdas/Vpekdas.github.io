import React from "react";

const FunFact: React.FC<{ funFact: string }> = ({ funFact }) => {
    return (
        <div className="mt-6">
            <p className="flex mb-2 gap-2 text-cyan-400 font-semibold justify-center">Fun Fact</p>
            <p className=" text-cyan-200/90 italic text-center animate-pulse">{funFact}</p>
        </div>
    );
};

export default FunFact;
