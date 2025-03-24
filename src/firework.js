export function createFireworks(number) {
    for (let i = 0; i < number; i++) {
        setTimeout(() => {
            const firework = document.createElement("div");
            let randomColor = getRandomColor();
            firework.classList.add("firework");
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.setProperty("--color", randomColor);
            document.body.appendChild(firework);

            firework.addEventListener("animationend", () => {
                firework.remove();
            });
        }, i * 100);
    }
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
