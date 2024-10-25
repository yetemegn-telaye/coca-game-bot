export const normalBalloonProperties = {
    alias: 'normal',
    size: 55,
    speed: 1,
    health: 2,
    color: 'big_balloon',
    // level: 1,
    rewardMultiplier: 1,
    get score() {
        return 1 * this.rewardMultiplier;
    },
    animation: {
      duration: 400,
      ease: 'Back.easeIn',

    },
    inflationRate: 0,
    glow: true,
    particleTrail: true,
    popParticles: 'confetti',


    // onClick: (balloon) => {
    //   balloon.health = 0;
    //   if(balloon.health === 0){
    //     alert('pop');
    //     // balloon.destroy();
    //   }
    // },
    // onPop: (balloon) => {
    //   this.score = balloon.score;
    // },
    // splash: 'betty'
}