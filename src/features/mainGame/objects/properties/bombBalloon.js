
export const bombBalloonProperties = {
    alias: 'bomb_balloon',
    health: 1,
    size: 90,
    color: 'red_balloon',
    speed: 1,
    level: 7,
    rotationSpeed: 1,
    rewardMultiplier: 12,
    animation: {
        duration: 400,
        ease: 'Back.easeIn',
    },
    inflationRate: 0,
    get score() {
        return (1 * this.level) - this.rewardMultiplier;
    },
    color_change_rate: 0,

    glow: true,
    particleTrail: true,
    popParticles: 'confetti',


}