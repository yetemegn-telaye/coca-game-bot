
export const colorChangingBalloonProperties = {
    alias: 'color_changing_balloon',
    health: 1,
    size: 80,
    color: 'green_balloon',
    speed: 1,
    level: 5,
    rewardMultiplier: 3,
    color_change_rate: 1000,
    get score() {
        return 1 * this.rewardMultiplier;
    },
    animation: {
        duration: 3000,
        ease: 'Back.easeIn',
    },
    house_color: 'red',
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',
    rightColorRewardMultiplier: 1,
    wrongColorRewardMultiplier: 0,

      
}