import Phaser from 'phaser';
import { move, resetPosition } from '../../../utils/dropMovement';
import balloon from "./balloon";

class Balloon extends Phaser.GameObjects.Image {

  constructor(scene, x, y, properties) {

    super(scene, x, y, properties.color);

    scene.add.existing(this);

    this.properties = properties;

    this.alias = properties.alias;
    this.scene = scene;

    this.size = properties.size;
    this.maxSize = properties.maxSize;
    this.inflationAmount = properties.inflationAmount;
    this.minSize = properties.minSize;

    this.deflationAmount = properties.deflationAmount;
    this.speed = properties.speed;
    this.health = properties.health;

    this.color = properties.color;

    this.type = properties.type;

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
    this.on('pointerdown', () => this.inflate(this));
    this.on('pointerdown', () => this.deflate(this));

    this.on('destroy', () => this.y < this.scene.sys.canvas.height ?  properties.onPop(this): console.log("Dropped"));

    console.log(this.properties.alias);


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
  }


    inflate(){
      if (this.size < this.maxSize) {
          this.size += this.inflationAmount; 
          console.log('inflated size: ', this.size);
          this.setScale(this.size / this.width, this.size / this.height);
      }
    }


    deflate(){
      if (this.size > this.minSize) {
          this.size -= this.deflationAmount; 
          console.log('deflated size: ', this.size);
          this.setScale(this.size / this.width, this.size / this.height);
      }
    }

}



export default Balloon;