export const skullIceCubeProperties = {
    alias: 'skull_ice_cube',
    size: 55,
    speed: 1,
    health: 1,
    // get color(){
    //   let colors = ['golden']
    //   return colors[Math.floor(Math.random() * colors.length)] + '_balloon';
    // },
    color: 'skull_icecube',
    get score() {
        return 100;
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

        balloon.animate();
        balloon.scene.sound.play('pop');

        console.log('score', balloon.scene.score);
        balloon.scene.score -= (balloon.properties.score * balloon.scene.scoreMultiplier);

        if (balloon.scene.score < 0) {
            balloon.scene.score = 0; 
        }

        console.log('scoreMultiplier', balloon.scene.scoreMultiplier);
        console.log('score', balloon.scene.score);
        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);
    }
}