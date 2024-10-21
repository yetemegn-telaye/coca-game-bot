export const smallBalloonProperties = {
    alias: 'small_balloon',
    color: 'green_balloon',
    health: 2,
    size: 50,
    speed: 1,
    level: 5,
    get score() {
        return 1 * this.level;
    },
    color_change_rate: 0,
    animation: {
        duration: 3000,
        ease: 'Cubic.easeIn',
    },
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',

}