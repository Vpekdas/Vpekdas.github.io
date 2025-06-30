import React, { useEffect, useState } from "react";

const randArray = "§1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./±!@#$%^&*()_+{}|<>?";

function scrambleAll(text: string): string {
    return text
        .split("")
        .map((char) => (char === " " ? " " : randArray[Math.floor(Math.random() * randArray.length)]))
        .join("");
}

interface DecodeEffectProps {
    text: string;
    className?: string;
}

const DecodeEffect: React.FC<DecodeEffectProps> = ({ text, className }) => {
    const [display, setDisplay] = useState(() => scrambleAll(text));

    useEffect(() => {
        let textArray = scrambleAll(text).split("");
        const wordArray = text.split(" ");
        let previousWordLength = 0;

        const decode = setInterval(() => {
            let idx = Math.floor(Math.random() * textArray.length);
            while (textArray[idx] === " ") {
                idx = Math.floor(Math.random() * textArray.length);
            }
            const randChar = randArray[Math.floor(Math.random() * randArray.length)];
            textArray[idx] = randChar;
            setDisplay(textArray.join(""));
        }, 10);

        const revealDelay = 1000;
        const wordRevealGap = 80;

        wordArray.forEach((word, index) => {
            setTimeout(() => {
                clearInterval(decode);

                for (let j = 0; j < word.length; j++) {
                    textArray[previousWordLength + j] = word[j];
                }
                setDisplay(textArray.join(""));

                previousWordLength += word.length + 1;
                if (previousWordLength - 1 < textArray.length) {
                    textArray[previousWordLength - 1] = " ";
                }

                if (index < wordArray.length - 1) {
                    setTimeout(() => {
                        setDisplay(textArray.join(""));
                    }, 0);
                }
            }, revealDelay + index * wordRevealGap);
        });

        return () => {
            clearInterval(decode);
        };
    }, [text]);

    return <span className={className}>{display}</span>;
};

export default DecodeEffect;
