import { countDiscoveredProject } from "./utils";

export function updateProgress(projects, discovered) {
    const elem = document.querySelector(".progress-done");
    const achievementDiscovered = countDiscoveredProject(projects);
    const achievementTotal = projects.length;
    const interval = 100;
    let currentWidth = (discovered / achievementTotal) * 100;
    if (achievementDiscovered === achievementTotal) {
        const highlight = document.querySelector(".highlight");
        highlight.style.color = "green";
    }
    function frame() {
        let targetWidth = (achievementDiscovered / achievementTotal) * 100;
        {
            if (currentWidth < targetWidth) {
                currentWidth += 1;
                if (currentWidth > 100) {
                    currentWidth = 100;
                }
                elem.style.width = `${currentWidth.toFixed(0)}%`;
                elem.innerHTML = `${currentWidth.toFixed(0)}%`;
            }
        }
    }
    setInterval(frame, interval);
}
