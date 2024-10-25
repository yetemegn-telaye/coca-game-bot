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

    // if(this.alias === 'inflating_balloon'){
    //   this.inflate();
    // }else if(this.alias === 'deflating_balloon'){
    //   this.startDeflating();
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


  // startInflating() {
  //   // this.on('pointerdown', this.inflate, this);
  //   this.inflateTimer = this.scene.time.addEvent({ //
  //     delay: 100, // Adjust this value to control inflation speed
  //     callback: this.inflate,
  //     callbackScope: this,
  //     loop: true
  //   });
  // }

  // inflate() {
  //   if(this.properties.alias === 'inflating_balloon'){
  //     this.properties.size = this.properties.size + this.properties.inflationRate;
  //   }
  // }

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
    // if(this.properties.alias === 'inflating_balloon'){
    //   this.properties.size += 50;
    // }

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
    
    // this.inflate();





     if (this.properties.health <= 0) {

    this.scene.sound.play('pop');

    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      duration: this.properties.animation.duration,
      ease: this.properties.animation.ease,
      onComplete: () => {
        // var totalScore = this.properties.score;

        let totalScore = Math.max(this.properties.score, 0); //
        this.scene.onBalloonPopped(totalScore);
        console.log(totalScore);

   
        this.scene.incrementPoppedCount();

        if(this.properties.alias === 'golden_balloon'){
          this.popSurroundingBalloons();
        }
      }

    });
  }


  }


  popSurroundingBalloons() {
    const radius = 100; // 2cm in game units 
    const surroundingBalloons = this.scene.balloons.filter(balloon => {
      if (balloon === this) return false; 
      const distance = Phaser.Math.Distance.Between(this.x, this.y, balloon.x, balloon.y);
      return distance <= radius;
    });
  
    surroundingBalloons.forEach(balloon => {
      balloon.popBalloon();
    });
  }

}

export default Balloon;
