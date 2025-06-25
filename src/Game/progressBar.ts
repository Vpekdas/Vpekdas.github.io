import { countDiscoveredProject } from "./utils";

export function updateProgress(projects: any, discovered: any) {
    const elem = document.querySelector(".progress-done") as HTMLElement | null;
    const achievementDiscovered = countDiscoveredProject(projects);
    const achievementTotal = projects.length;
    const interval = 100;
    let currentWidth = (discovered / achievementTotal) * 100;
    if (achievementDiscovered === achievementTotal) {
        const highlight = document.querySelector(".highlight") as HTMLElement | null;
        if (highlight) {
            highlight.style.color = "green";
        }
    }

    function frame() {
        let targetWidth = (achievementDiscovered / achievementTotal) * 100;
        {
            if (currentWidth < targetWidth) {
                currentWidth += 1;
                if (currentWidth > 100) {
                    currentWidth = 100;
                }
                if (elem) {
                    elem.style.width = `${currentWidth.toFixed(0)}%`;
                    elem.innerHTML = `${currentWidth.toFixed(0)}%`;
                }
            }
        }
    }
    setInterval(frame, interval);
}
