


export const normalBalloonProperties = {
    alias: 'normal',
    size: 55,
    speed: 1,

    health: 1,
    get color(){

        let colors = ['red','green']
        return colors[Math.floor(Math.random() * colors.length)] + '_balloon';
    },



    get score() {
        return 1;
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

        balloon.animate();
      if(balloon.health <= 0){
       balloon.destroy();
      }
      
    },
    onPop: (balloon) => {

        balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier);

        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);


        balloon.scene.sound.play('pop');

    }
}