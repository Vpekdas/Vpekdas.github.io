export function countDiscoveredProject(projects) {
    let achievement = 0;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered === true) {
            achievement++;
        }
    }
    return achievement;
}

export function ensureCanvasFocus() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
        canvas.focus();
    }
}

export function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
        return;
    }

    k.camScale(k.vec2(1.5));
}

export function resetAdventure() {
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}
