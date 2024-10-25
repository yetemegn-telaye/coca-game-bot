export const goldenBalloonProperties = {
    alias: 'golden_balloon',
    health: 2, 
    size: 60, 
    color: 'big_balloon', 
    speed: 3,
    level: 8,
    rewardMultiplier: 10,
    rotationSpeed: 1,
    get score() {
        return 1 * this.level + this.rewardMultiplier;
    },
    animation: {
        duration: 400,
        ease: 'Back.easeIn',
    },

    glow: true,
    particleTrail: true,
    popParticles: 'confetti',





}