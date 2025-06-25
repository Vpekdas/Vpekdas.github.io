export function saveToLocalStorage(projectName: string) {
    localStorage.setItem(projectName, "true");
}

export function loadLocalStorage(projects: any) {
    for (let i = 0; i < projects.length; i++) {
        if (localStorage.getItem(projects[i].name) === "true") {
            projects[i].discovered = true;
        } else {
            projects[i].discovered = false;
        }
    }
}
