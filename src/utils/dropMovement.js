import Phaser from "phaser";
  
  export  const resetPosition = function() {
    this.destroy();
    const randomX = Phaser.Math.Between(0, this.scene.sys.canvas.width); // Get random X position within canvas width
    this.y = 0;

    this.x = randomX;
  };
  
  export function move(scene) {
    this.y -= this.speed; // Move downward by increasing the y value
  
    // If the object moves off the bottom of the screen, reset it to the top
    if (this.y < 0) {
      this.y = scene.sys.canvas.height; // Reset to the top of the canvas
       this.x = Phaser.Math.Between(0, scene.sys.canvas.width); // Reset to a random X position
    }
   
  }
  

  