export const bonusIceCubeProperties = {
    alias: 'bonus_ice_cube',
    size: 55,
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
    alert("popped");



      if (!balloon.scene) {
        console.error('balloon.scene is undefined');
        return; 
      }

      // console.log('isScoreTripled', balloon.scene.scoreMultiplierOn);
      console.log('scoreMultiplier', balloon.scene.scoreMultiplier);

      // balloon.scene.scoreMultiplierOn = true; 
      balloon.scene.scoreMultiplier = 3; 

      // console.log('scoreMultiplierOn', balloon.scene.scoreMultiplierOn);
      console.log('scoreMultiplier', balloon.scene.scoreMultiplier);




      // console.log('scoreMultiplierOn', balloon.scene.scoreMultiplierOn);
      console.log('scoreMultiplier', balloon.scene.scoreMultiplier);

      balloon.animate();
      balloon.scene.sound.play('pop');





        console.log('score', balloon.scene.score);
        balloon.scene.score += (balloon.properties.score * balloon.scene.scoreMultiplier);

        console.log('scoreMultiplier', balloon.scene.scoreMultiplier);
        console.log('score', balloon.scene.score);
        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);

    }
}