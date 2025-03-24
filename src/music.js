export function playMusic() {
    loadSound("opening", "/steins-gate/opening.mp3");

    const music = play("opening", {
        loop: true,
        volume: 0.5,
    });
}
