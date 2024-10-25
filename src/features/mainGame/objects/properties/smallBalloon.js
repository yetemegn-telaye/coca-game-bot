

export const smallBalloonProperties = {
    alias: 'small_balloon',
    color: 'green_balloon',
    health: 3,
    size: 50,
    speed: 1,
    // level: 5,
    rewardMultiplier: 5,
    get score() {
        return 1 * this.rewardMultiplier;
    },
    color_change_rate: 0,
    animation: {
        duration: 1000,
        ease: 'Back.easeIn',
    },
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',

}