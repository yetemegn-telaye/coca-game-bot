import Phaser from 'phaser';
import BackgroundImage from '../../../assets/coca-bg2.png';
import Balloon from '../objects/balloon';
import Label from '../objects/gameLabel';
import CorkIcon from '../../../assets/icons/coca-cola-cap2-removebg-preview 1.png';
import TrophyIcon from '../../../assets/icons/Group.png';
import SkullIcecube from '../../../assets/images/skullIcecube.png';
import CocaIcecube from '../../../assets/images/bottleIcecube.png';
import BonusIcecube from '../../../assets/images/coinIcecube.png';
import {move} from '../../../utils/dropMovement';

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
    this.load.image('skull_icecube', SkullIcecube);
    this.load.image('coca_icecube', CocaIcecube);
    this.load.image('bonus_icecube', BonusIcecube);
    
  }

  create() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;

    this.background = this.add.tileSprite(0, 0, canvasWidth, canvasHeight, 'background');
    this.background.setOrigin(0, 0);
    this.background.setScrollFactor(0);

   
    this.balloons = [
      new Balloon(this, canvasWidth / 2, canvasHeight, 0xff0000, 40, 2),  // Red balloon with speed 2
      new Balloon(this, canvasWidth / 4, canvasHeight, 0x00ff00, 30, 3),  // Green balloon with speed 3
      new Balloon(this, (3 * canvasWidth) / 4, canvasHeight, 0x0000ff, 50, 2) // Blue balloon with speed 1
    ];
   this.ice_cubes = [
    this.add.image(Phaser.Math.Between(0,canvasWidth),Phaser.Math.Between(0,canvasHeight) , 'skull_icecube').setInteractive(),
    this.add.image(Phaser.Math.Between(0,canvasWidth),Phaser.Math.Between(0,canvasHeight), 'coca_icecube').setInteractive(),
    this.add.image(Phaser.Math.Between(0,canvasWidth),Phaser.Math.Between(0,canvasHeight), 'bonus_icecube').setInteractive()
  ];
   
    this.scoreLabel = new Label(this, canvasWidth / 4, 30, `Score: ${this.score}`, {
      background: { backgroundColor: 'fffff', width: 100 }
    }, 'cork_icon');

    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place: ${this.place}st`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'trophy_icon');
  }

  update() {
    this.balloons.forEach(balloon => {balloon.move()
      this.background.tilePositionY = balloon.y / 2;
    });
    
   
    this.ice_cubes.forEach(ice_cube => {
      ice_cube.displayHeight = 70;
      ice_cube.displayWidth = 70;
      ice_cube.y += 1;
      if (ice_cube.y > this.sys.canvas.height) {
        ice_cube.y = 0;
        ice_cube.x = Phaser.Math.Between(0, this.sys.canvas.width);
      }
      this.background.tilePositionY = ice_cube.y / 2;
    });
    this.score = 100; 
    this.scoreLabel.setText(` ${this.score}`);


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
