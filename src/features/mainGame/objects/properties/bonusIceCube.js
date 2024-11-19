export const bonusIceCubeProperties = {
    alias: 'bonus_ice_cube',
    size: 82,
    speed: 1,
    health: 1,
    // get color(){
    //   let colors = ['golden']
    //   return colors[Math.floor(Math.random() * colors.length)] + '_balloon';
    // },
    color: 'bonus_icecube',

    type: 'bonus',
    get score() {
        return 0;
    },
    // animation: {
    //   duration: 400,
    //   ease: 'Bounce',
    // },


    click: (balloon) => {
      
      balloon.health -= 1;

      if(balloon.health <= 0){
        balloon.destroy();

      }

    },
    onPop: (balloon) => {
     
      if(balloon.scene.gameOver) return;


      if (!balloon.scene) {
        console.error('balloon.scene is undefined');
        return; 
      }

      // console.log('isScoreTripled', balloon.scene.scoreMultiplierOn);
      console.log('scoreMultiplier', balloon.scene.scoreMultiplier);

       balloon.scene.scoreMultiplierOn = true;

       balloon.scene.bonusOnScreen = false;
       balloon.scene.scoreMultiplier = 3;
       balloon.scene.scoreLabel.setImage('bonus_icecube');
       balloon.scene.showLevelUpEffect('BONUS',"#FFD700");
       balloon.scene.sound.play('shoutYeah');

      balloon.animate();
      balloon.scene.sound.play('pop');
      const scene = balloon.scene;



        setTimeout(() => {
            scene.scoreMultiplier = 1;
            scene.scoreMultiplierOn = false;
            scene.scoreLabel.setBorderColor('#000000');
            scene.scoreLabel.setImage('cork_icon',0.5);
            console.log('scoreMultiplier', scene.scoreMultiplier);
        }, 20000);





      balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier);
        console.log('scoreMultiplier', balloon.scene.scoreMultiplier);
        console.log('score', balloon.scene.score);
        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);

    }
}