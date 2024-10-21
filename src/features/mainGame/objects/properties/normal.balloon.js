export const normalBalloonProperties = {
    alias: 'normal',
    size: 75,
    speed: 1,
    health: 2,
    color: 'green_balloon',
    get score() {
        return 1 * this.level;
    },
    animation: {
      duration: 3000,
      ease: 'Bounce',

    },
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