export const  deflatingBalloonProperties = {
    alias: 'deflating_balloon',
    health: 5, 
    size: 100, 
    color: 'big_balloon', 
    speed: 3,
    level: 4,
    rewardMultiplier: 0,
    rotationSpeed: 1,
    animation: {
        duration: 400,
        ease: 'Back.easeIn',
      },
    get score() {
        return 1 * this.level;
    },
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',


}