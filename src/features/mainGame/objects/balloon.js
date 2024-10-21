import Phaser from 'phaser';
import { move, resetPosition } from '../../../utils/dropMovement';

class Balloon extends Phaser.GameObjects.Image {
  constructor(scene, x, y, properties) {
    super(scene, x, y, properties.color);

    scene.add.existing(this);

    this.alias = properties.alias;
    this.size = properties.size;
    this.speed = properties.speed;
    this.health = properties.health;
    this.color = properties.color;
    this.rotationSpeed = properties.rotationSpeed;
    this.rewardMultiplier = properties.rewardMultiplier;
    this.score = properties.score;
    this.glow = properties.glow;
    this.particleTrail = properties.particleTrail;
    this.popParticles = properties.popParticles;
    this.rightColorRewardMultiplier = properties.rightColorRewardMultiplier;
    this.wrongColorRewardMultiplier = properties.wrongColorRewardMultiplier;
    this.color_change_rate = properties.color_change_rate;
    this.texture = properties.texture;

    // var total_score = 0;
    // total_score += this.score;

  


    // Ensure move and resetPosition functions are bound to this instance
    this.move = move.bind(this);
    this.properties = properties;


    this.resetPosition = resetPosition.bind(this);
    scene.physics.world.enable(this);


    this.setScale(this.size / this.width, this.size / this.height);
    this.setInteractive();
    this.on('pointerdown', this.popBalloon, this);
    // this.on('destroy', properties.onPop(this), this);


    if(this.alias === 'color_changing_balloon'){
      this.startColorChange();
    }

    // this.onPointerDown = () => {
    if(this.alias === 'inflating_balloon'){
      this.startInflating();
    }else if(this.alias === 'deflating_balloon'){
      this.startDeflating();
    }
    // }
  }


  startColorChange() {
    this.colorChangeTimer = this.scene.time.addEvent({
      delay: this.color_change_rate, // 1 second
      callback: this.changeColor,
      callbackScope: this,
      loop: true
    });
  }

  changeColor() {
    const randomColor = Phaser.Display.Color.RandomRGB();
    this.setTint(randomColor.color);
  }


  startInflating() {
    // this.on('pointerdown', this.inflate, this);
    this.inflateTimer = this.scene.time.addEvent({ //
      delay: 100, // Adjust this value to control inflation speed
      callback: this.inflate,
      callbackScope: this,
      loop: true
    });
  }

  inflate() {
    const inflationRate = 0.05; // Adjust this value to control inflation rate
    const maxScale = 2; // Maximum scale before popping

    this.setScale(this.scaleX + inflationRate, this.scaleY + inflationRate);

    // if (this.scaleX >= maxScale) {
    //   this.popBalloon();
    // }
  }

  startDeflating() {
    this.deflateTimer = this.scene.time.addEvent({
      delay: 100, 
      callback: this.deflate,
      callbackScope: this,
      loop: true
    });
  }

  deflate() {
    const deflationRate = 0.01; // Adjust this value to control deflation rate
    const minScale = 0.5; // Minimum scale before popping

    this.setScale(this.scaleX - deflationRate, this.scaleY - deflationRate);

    if (this.scaleX <= minScale) {
      this.popBalloon();
    }
  }

  popBalloon() {
    // var house_color = 'red';


    this.properties.health -= 1;


    if (this.colorChangeTimer) {
      this.colorChangeTimer.remove();
      this.colorChangeTimer = null;
    }
    if (this.inflateTimer) {
      this.inflateTimer.remove();
      this.inflateTimer = null;
    }
    if (this.deflateTimer) {
      this.deflateTimer.remove();
      this.deflateTimer = null;
    }


      this.scene.sound.play('pop');

    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      duration: this.properties.animation.duration,
      ease: this.properties.animation.ease,
      // onComplete: () => {
      //   // this.destroy();
      // }

    });
    // emitParticles(this.popParticles);
    this.scene.add.particles(this.properties.popParticles).setScale(0.5).setDepth(1000);
    this.scene.onBalloonPopped(this.properties.score);
  }


}

export default Balloon;
