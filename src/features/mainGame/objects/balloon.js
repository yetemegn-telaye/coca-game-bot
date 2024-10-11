import Phaser from 'phaser';
import {move, resetPosition} from '../../../utils/dropMovement';


class Balloon extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, color, size, speed) {
    super(scene, x, y, size, size, color);

    scene.add.existing(this);

    this.color = color;
    this.size = size;
    this.speed = speed;


    this.move = move.bind(this);
    this.resetPosition = resetPosition.bind(this);
    scene.physics.world.enable(this);
  }
}

export default Balloon;
