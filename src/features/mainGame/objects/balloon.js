import Phaser from 'phaser';
import { move, resetPosition } from '../../../utils/dropMovement';

class Balloon extends Phaser.GameObjects.Image {
  constructor(scene, x, y, properties) {

    super(scene, x, y, properties.color);

    scene.add.existing(this);

    this.properties = properties;

    this.alias = properties.alias;
    this.scene = scene;
    this.size = properties.size;

    this.speed = properties.speed;
    this.health = properties.health;
    this.color = properties.color;
    this.rotationSpeed = properties.rotationSpeed;

    this.score = properties.score;
    this.glow = properties.glow;
    this.particleTrail = properties.particleTrail;
    this.popParticles = properties.popParticles;

    this.rightColorRewardMultiplier = properties.rightColorRewardMultiplier;
    this.wrongColorRewardMultiplier = properties.wrongColorRewardMultiplier;

    this.color_change_rate = properties.color_change_rate;
    this.texture = properties.texture;
  


    // Ensure move and resetPosition functions are bound to this instance
    this.move = move.bind(this);
    this.properties = properties;


    this.resetPosition = resetPosition.bind(this);
    scene.physics.world.enable(this);


    this.setScale(this.size / this.width, this.size / this.height);
    this.setInteractive();

    this.on('pointerdown', () => properties.click(this));
    if(this.y < scene.sys.canvas.height){
      this.on('destroy', () => 
        properties.onPop(this));
    }
    
  // console.log(scene.sys.canvas.height)

  }

  animate() {
    console.log('animate')
    console.log('Before tween:', this.scaleX, this.scaleY, this.alpha); // Log initial properties

    const explosion = this.scene.add.sprite(this.x, this.y, 'explosion');
    explosion.setScale(this.size / explosion.width, this.size / explosion.height);

    explosion.play('explode');

    explosion.on('animationcomplete', () => {
      explosion.destroy();
      
      // this.resetBalloon(); 
    });

    // this.scene.tweens.add({
    //   targets: this,
    //   scaleX: 0,

    //   scaleY: 0,
    //   alpha: 0,  // Fades out the balloon
    //   duration: 500,
    //   ease: 'Back.easeIn',  // You can also try other easing functions like 'Cubic.easeOut'
    //     onComplete: () => {
    //       console.log('Tween animation completed'); 
    //       console.log('After tween:', this.scaleX, this.scaleY, this.alpha); // Log properties after completion

    //     }
    // });
  }
}


export default Balloon;