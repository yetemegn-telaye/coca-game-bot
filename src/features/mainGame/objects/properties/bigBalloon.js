export const bigBalloonProperties = {
    alias: 'big_balloon',
    size: 145,
    speed: 1,
    health: 3,
    get color(){
  
        let colors = ['red','green', 'brown', 'purple', 'blue']
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
  
  
    }
}