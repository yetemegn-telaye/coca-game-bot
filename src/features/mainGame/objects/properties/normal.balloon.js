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
      
      balloon.health -= 1;
      alert('clicked');

      if(balloon.health === 0){
        balloon.properties.onPop(balloon); //
      }
      
    },
    onPop: (balloon) => {
      // var totalScore = 0;
      // totalScore += balloon.score;

      //remove balloon
      balloon.destroy();
      alert("popped");
      // this.score = balloon.score;
    },
   
}