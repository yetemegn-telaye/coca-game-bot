export const normalBalloonProperties = {
    alias: 'normal_balloon',
    size: 55,
    speed: 3,
    health: 1,

    type: 'balloon',

    get color(){

      let colors = ['red','green', 'golden']
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

      if(balloon.health <= 0){
        balloon.destroy();
      }

    },
    onPop: (balloon) => {


        balloon.animate();
        balloon.scene.sound.play('pop');
     

        balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier);

        
        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);
        if(balloon.scene.scoreMultiplierOn){
          balloon.scene.screenShake(0.02,100);
          balloon.scene.sound.play('boom');
            balloon.scene.showBonusFloatingText(balloon.properties.score * balloon.scene.scoreMultiplier,balloon.x, balloon.y );
        }else{
            balloon.scene.showFloatingScore(balloon.properties.score * balloon.scene.scoreMultiplier,balloon.x, balloon.y);
        }

    }
}