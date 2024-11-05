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

        balloon.destroy();

    },
    onPop: (balloon) => {

        balloon.animate();
        // balloon.scene.sound.play('pop');
        balloon.scene.sound.play('uhOh')
        balloon.scene.showLevelUpEffect("ክሽም","#FF0000")
        balloon.scene.score = 0
        balloon.scene.scoreLabel.setText(`Score: ${balloon.scene.score}`);
    }

}