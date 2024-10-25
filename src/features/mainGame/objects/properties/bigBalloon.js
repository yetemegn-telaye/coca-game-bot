export const bigBalloonProperties = {
    alias: 'big_balloon',
    health: 3,
    size: 100,
    color: 'green_balloon',
    speed: 2,
    level: 2,
    rotationSpeed: 1,
    rewardMultiplier: 2,
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',
    animation: {
        duration: 400,
        ease: 'Back.easeIn',
    },
    get score() {
        return 1 * this.level * this.rewardMultiplier;
    },
    color_change_rate: 0,
    inflationRate: 0.05





    // onClick: function(){
    //     this.health -= 1; 

    //     if (this.health === 0) {
    //         this.onPop(); 
    //     }
    // },
    // onPop(){
    //     big_total_score += this.score; 
    //     return this.score;
    // }
}