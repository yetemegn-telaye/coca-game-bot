export const inflatingBalloonProperties = {
    alias: 'inflating_balloon',
    health: 2, 
    size: 50, 
    color: 'green_balloon', 
    speed: 2,
    // level: 4,
    rewardMultiplier: 3,
    inflationRate: 50,
    get score() {
        return 1 * this.rewardMultiplier;
    },
    animation: {
        duration: 400,
        ease: 'Back.easeIn',
    },
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',

}