export const skullIceCubeProperties = {
    alias: 'skull_ice_cube',
    size: 82,
    speed: 1,
    health: 1,
 
    color: 'skull_icecube',
    type: 'death',


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