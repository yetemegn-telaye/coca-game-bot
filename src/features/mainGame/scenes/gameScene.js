import Phaser from 'phaser';
import BackgroundImage from '../../../assets/coca-bg2.png';
import Balloon from '../objects/balloon';
import Label from '../objects/gameLabel';
import CorkIcon from '../../../assets/icons/coca-cola-cap2-removebg-preview 1.png';
import TrophyIcon from '../../../assets/icons/Group.png';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this.score = 0; // Initialize score
    this.place = 1; // Initialize place
  }

  preload() {
    this.load.image('background', BackgroundImage);
    this.load.image('cork_icon',CorkIcon);
    this.load.image('trophy_icon',TrophyIcon);
  }

  create() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;

    this.background = this.add.tileSprite(0, 0, canvasWidth, canvasHeight, 'background');
    this.background.setOrigin(0, 0);

   
    this.balloons = [
      new Balloon(this, canvasWidth / 2, canvasHeight, 0xff0000, 40, 2),  // Red balloon with speed 2
      new Balloon(this, canvasWidth / 4, canvasHeight, 0x00ff00, 30, 3),  // Green balloon with speed 3
      new Balloon(this, (3 * canvasWidth) / 4, canvasHeight, 0x0000ff, 50, 1) // Blue balloon with speed 1
    ];

   
    this.scoreLabel = new Label(this, canvasWidth / 4, 30, `Score: ${this.score}`, {
      background: { backgroundColor: 'fffff', width: 100 }
    }, 'cork_icon');

    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place: ${this.place}st`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'trophy_icon');
  }

  update() {
    this.balloons.forEach(balloon => balloon.move());
    this.background.tilePositionY -= 1;

    // Set a fixed score value
    this.score = 100; // Set a fixed score value of 100
    this.scoreLabel.setText(` ${this.score}`);

    // Update the place dynamically
    if (this.score > 500) {
      this.place = 2;
    }
    if (this.score > 1000) {
      this.place = 3;
    }
    this.placeLabel.setText(` ${this.place}${this.getPlaceSuffix(this.place)}`);
  }

  getPlaceSuffix(place) {
    switch (place) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
}

export default GameScene;
