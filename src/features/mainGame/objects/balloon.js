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
    // Hide the balloon and disable its interaction
    this.setVisible(false);
    this.disableInteractive();

    // Create explosion animation at the balloon's position
    const explosion = this.scene.add.sprite(this.x, this.y, 'explosion');
    explosion.setScale(this.size / explosion.width, this.size / explosion.height);

    explosion.play('explode');

    explosion.on('animationcomplete', () => {
      explosion.destroy();
      this.destroy(); // Destroy the balloon after the animation is complete
    });
  }
}

export default Balloon;
