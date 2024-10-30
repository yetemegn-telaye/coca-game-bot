


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

      if(balloon.health <= 0){

      //   setTimeout(() => {
      //     balloon.destroy();
      //   }, 500); 
      // } else {
      //   balloon.animate();
        balloon.destroy();
      }

    },
    onPop: (balloon) => {


      // const balloonPosition = { x: balloon.x, y: balloon.y };
    
      // console.log(`Balloon popped at position:`, balloonPosition);

      // console.log(scene.y);

        balloon.animate();
        balloon.scene.sound.play('pop');

        balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier);

        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);


    }
}