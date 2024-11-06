import { countDiscoveredProject } from "./utils";

const maxDivergence = 1.048596;
const initialDivergence = 0.337187;
const totalDigits = 10;
let currentDivergence = initialDivergence;

function spinDigit(element, correctChar, delay) {
    const spinInterval = setInterval(() => {
        const randomDigit = Math.floor(Math.random() * totalDigits);
        element.src = `img/${randomDigit}.jpg`;
    }, 100);

    setTimeout(() => {
        clearInterval(spinInterval);
        element.src = `img/${correctChar === "." ? "dot" : correctChar}.jpg`;
    }, 3000 + delay);
}

export function regenerateNumber(projects) {
    if (currentDivergence >= maxDivergence) {
        return;
    }

    const discoveredProjects = countDiscoveredProject(projects);

    if (discoveredProjects === projects.length) {
        currentDivergence = maxDivergence;
    } else if (discoveredProjects > 0) {
        const increment = (maxDivergence - initialDivergence) / projects.length;
        currentDivergence += increment;
        if (currentDivergence > maxDivergence) {
            currentDivergence = maxDivergence;
        }
    }

    const divergenceString = currentDivergence.toFixed(6).toString();
    const digits = divergenceString.split("");

    const glitchContainer = document.querySelector(".glitch");
    glitchContainer.innerHTML = "";

    digits.forEach((char, index) => {
        const img = document.createElement("img");
        img.src = `img/${char === "." ? "dot" : char}.jpg`;
        img.alt = `Digit ${char}`;
        img.classList.add("glitch-digit");
        glitchContainer.appendChild(img);

        spinDigit(img, char, index * 100);
    });
}
