import Phaser from 'phaser';
import { move, resetPosition } from '../../../utils/dropMovement';

class Balloon extends Phaser.GameObjects.Image {
  constructor(scene, x, y, textureKey, size, speed) {
    super(scene, x, y, textureKey);

    scene.add.existing(this);

    this.size = size;
    this.speed = speed;

    // Ensure move and resetPosition functions are bound to this instance
    this.move = move.bind(this);
    this.resetPosition = resetPosition.bind(this);

    scene.physics.world.enable(this);

    this.setScale(this.size / this.width, this.size / this.height);
    this.setInteractive();
    this.on('pointerdown', this.popBalloon, this);
  }

  popBalloon() {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      duration: 200,
      ease: 'Power1',
      onComplete: () => {
        this.destroy();
      }
    });
  }
}

export default Balloon;
