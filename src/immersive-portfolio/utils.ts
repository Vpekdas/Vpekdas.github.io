export function ensureCanvasFocus() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
        canvas.focus();
    }
}

export function countDiscoveredProject(projects: any) {
    let achievement = 0;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].discovered === true) {
            achievement++;
        }
    }
    return achievement;
}

export function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}
