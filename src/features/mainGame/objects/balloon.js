import Phaser from 'phaser';

class Balloon extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, color, size, speed) {
    super(scene, x, y, size, size, color);

    // Add the balloon to the scene
    scene.add.existing(this);

    // Initialize properties
    this.color = color;
    this.size = size;
    this.speed = speed;

    // Enable physics on the balloon
    scene.physics.world.enable(this);
  }

  // Method to reset the balloon's position to the top with a new random X position
  resetPosition() {
    const randomX = Phaser.Math.Between(0, this.scene.sys.canvas.width); // Get random X position within canvas width
    this.y = 0; // Reset to the top of the canvas
    this.x = randomX; // Set new X position
  }

  // Method to move the balloon downwards
  move() {
    this.y += this.speed; // Move the balloon down based on its speed
    // Check if the balloon has moved off the bottom of the screen
    if (this.y > this.scene.sys.canvas.height) {
      this.resetPosition(); // Reset its position to the top
    }
  }
}

export default Balloon;
