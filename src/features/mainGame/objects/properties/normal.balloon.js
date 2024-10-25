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


    click: (balloon) => {
      alert('clicked');
      // balloon.health -= 1;
      
      // if(balloon.health === 0){
      //   balloon.destroy();
      // }
      
    },
    onPop: (balloon) => {
      alert('poped');
      // this.score = balloon.score;
    },
   
}