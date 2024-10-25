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
  


    // Ensure move and resetPosition functions are bound to this instance
    this.move = move.bind(this);
    this.properties = properties;


    this.resetPosition = resetPosition.bind(this);
    scene.physics.world.enable(this);


    this.setScale(this.size / this.width, this.size / this.height);
    this.setInteractive();
    this.on('pointerdown', () => { properties.click(this) });  
    this.on('destroy', () => { properties.onPop(this) });    
  
    // this.on('destroy', properties.onPop, properties);


  }

  



  // popBalloon() {


  //   this.properties.health -= 1;

    
    
  //   if (this.colorChangeTimer) {
  //     this.colorChangeTimer.remove();
  //     this.colorChangeTimer = null;
  //   }
  //   if (this.inflateTimer) {
  //     this.inflateTimer.remove();
  //     this.inflateTimer = null;
  //   }
  //   if (this.deflateTimer) {
  //     this.deflateTimer.remove();
  //     this.deflateTimer = null;
  //   }
    
  //   // this.inflate();





  //    if (this.properties.health <= 0) {

  //   this.scene.sound.play('pop');

  //   this.scene.tweens.add({
  //     targets: this,
  //     scaleX: 0,
  //     scaleY: 0,
  //     duration: this.properties.animation.duration,
  //     ease: this.properties.animation.ease,
  //     onComplete: () => {
  //       // var totalScore = this.properties.score;

  //       let totalScore = Math.max(this.properties.score, 0); //
  //       this.scene.onBalloonPopped(totalScore);
  //       console.log(totalScore);

   
  //       // this.scene.incrementPoppedCount();

  //       if(this.properties.alias === 'golden_balloon'){
  //         this.popSurroundingBalloons();
  //       }
  //     }

  //   });
  // }


  // }


  // popSurroundingBalloons() {
  //   const radius = 100; // 2cm in game units 
  //   const surroundingBalloons = this.scene.balloons.filter(balloon => {
  //     if (balloon === this) return false; 
  //     const distance = Phaser.Math.Distance.Between(this.x, this.y, balloon.x, balloon.y);
  //     return distance <= radius;
  //   });
  
  //   surroundingBalloons.forEach(balloon => {
  //     balloon.popBalloon();
  //   });
  // }

}

export default Balloon;
