export const inflatingBalloonProperties = {
    alias: 'inflating_balloon',
    size: 35,
    speed: 1,
    health: 3,
    get color(){

      let colors = ['red','green', 'golden']
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
    inflationAmount: 10,
    maxSize: 100,


    inflate: function() {

        console.log('inflation');
        if (this.size < this.maxSize) {
            this.size += this.inflationAmount; // Increase size
            console.log(this.size);
        }

        const scaleFactor = this.size / 35; // Assuming 35 is the original size
        this.setScale(scaleFactor);
        
    },



    click: (balloon) => {
      

    balloon.properties.inflate();
    console.log(balloon.size);


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