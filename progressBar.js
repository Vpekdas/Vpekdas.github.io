window.addEventListener("DOMContentLoaded", () => {
    const elem = document.querySelector(".progress-done");
    let width = 10;
    const targetWidth = 50;
    const interval = 50;

    function frame() {
        if (width >= targetWidth) {
            clearInterval(main);
        } else {
            width++;
            elem.style.width = `${width}%`;
            elem.innerHTML = `${width}%`;
        }
    }

    const main = setInterval(frame, interval);
});