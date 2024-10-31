import Phaser from 'phaser';
import GameScene from '../../scenes/gameScene';
export const bombBalloonProperties = {
    alias: 'bomb_balloon',
    size: 55,
    speed: 1,
    health: 1,
    get color(){

      let colors = ['red']
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

    radius: 500,

    click: (balloon) => {
      
      balloon.health -= 1;

      if(balloon.health <= 0){
        balloon.destroy();
      }

    },


    onPop: (balloon, scene) => {

      // Check if the balloon is already destroyed and exit if true
      if (balloon.destroyed) return;  

        balloon.animate();
        balloon.destroyed = true;
        balloon.scene.sound.play('pop');


        console.log('balloons in scene: ',  balloon.scene.balloons);

        // Filter out balloons that are not destroyed
        const balloonsToDestroy = balloon.scene.balloons.filter(otherBalloon => !otherBalloon.destroyed);

        balloonsToDestroy.forEach(otherBalloon => {
          otherBalloon.destroy(); // Call destroy on the balloon
          otherBalloon.destroyed = true; // Mark it as destroyed
      });

      balloon.scene.balloons = balloon.scene.balloons.filter(b => !b.destroyed);

        
      balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier);  //+ nearbyScore;


        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);

        console.log(balloon.scene.score);
    }


}