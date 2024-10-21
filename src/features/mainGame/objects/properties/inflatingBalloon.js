export const inflatingBalloonProperties = {
    alias: 'inflating_balloon',
    health: 5, 
    size: 1, 
    color: 'green_balloon', 
    speed: 2,
    level: 4,
    get score() {
        return 1 * this.level;
    },
    animation: {
        duration: 3000,
        ease: 'Bounce',
    },
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',

}