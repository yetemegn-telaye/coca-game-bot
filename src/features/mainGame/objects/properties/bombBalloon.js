import Phaser from 'phaser';
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

    popNearbyBalloons: (balloon) => {
        let totalScore = 0;
        
        const nearbyBalloons = balloon.scene.balloons.filter(otherBalloon => {
            // Calculate the distance between the bomb balloon and other balloons
            const distance = Phaser.Math.Distance.Between(balloon.x, balloon.y, otherBalloon.x, otherBalloon.y);
            return otherBalloon.health > 0 && distance < balloon.radius; // Check if within radius and alive
        });

        // Pop each nearby balloon
        nearbyBalloons.forEach(nearbyBalloon => {
          totalScore += nearbyBalloon.properties.score;
            nearbyBalloon.health = 0; // Set health to 0 to trigger the pop
            nearbyBalloon.onPop(nearbyBalloon); // Call the onPop method if it exists
        });
    },


    onPop: (balloon) => {

        balloon.animate();
        balloon.scene.sound.play('pop');

        const nearbyScore = bombBalloonProperties.popNearbyBalloons(balloon);

        balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier) + + nearbyScore;;

        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);


    }


}