import Phaser from 'phaser';
import GameScene from '../../scenes/gameScene';
export const bombBalloonProperties = {
    alias: 'bomb_balloon',
    size: 55,
    speed: 1,
    health: 1,
    color: 'bomb_balloon',
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


    onPop: (balloon) => {
      
      // Check if the balloon is already destroyed and exit if true
      if (balloon.destroyed) return;  
        const scene = balloon.scene;
        balloon.animate();
        balloon.destroyed = true;
        balloon.scene.sound.play('pop');




        // Filter out balloons that are not destroyed
        const balloonsToDestroy =  scene.balloons.filter(otherBalloon => !otherBalloon.destroyed || otherBalloon.type != 'death');

        balloonsToDestroy.forEach(otherBalloon => {
          otherBalloon.destroy(); // Call destroy on the balloon
          otherBalloon.destroyed = true; // Mark it as destroyed
        });

        scene.balloons = scene.balloons.filter(b => !b.destroyed);

          
        scene.score += (balloon.properties.score * scene.scoreMultiplier);  //+ nearbyScore;


        scene.scoreLabel.setText(`Score: ${scene.score}`);

        console.log(scene.score);
    }


}