import Phaser from "phaser";
  
  export  const resetPosition = function() {
    const randomX = Phaser.Math.Between(0, this.scene.sys.canvas.width); // Get random X position within canvas width
    this.y = 0;
    this.x = randomX; 
  };
export const move = function() {
    this.y += this.speed;
    if (this.y > this.scene.sys.canvas.height) {
      this.resetPosition();
    }
  };

  