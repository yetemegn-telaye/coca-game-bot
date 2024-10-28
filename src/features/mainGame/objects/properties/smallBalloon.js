let totalScore = 0;

export const smallBalloonProperties = {
    alias: 'small_balloon',
    color: 'green_balloon',
    health: 3,
    size: 45,
    speed: 1,
    // level: 5,
    rewardMultiplier: 5,
    get score() {
        return 1 * this.rewardMultiplier;
    },
    color_change_rate: 0,
    animation: {
        duration: 1000,
        ease: 'Back.easeIn',
    },
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
        totalScore += balloon.properties.score;
  
        // this.scoreLabel.setText(` ${totalScore}`);
        balloon.scene.score = totalScore;
        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);
  

        balloon.destroy();
        // this.scene.sound.play('pop');
  
        return totalScore;
      
      }
}