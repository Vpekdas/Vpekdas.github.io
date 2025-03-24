export function saveToLocalStorage(projectName) {
    localStorage.setItem(projectName, 1);
}

export function loadLocalStorage(projects) {
    for (let i = 0; i < projects.length; i++) {
        if (localStorage.getItem(projects[i].name) === "1") {
            projects[i].discovered = true;
        } else {
            projects[i].discovered = false;
        }
    }
}
