import Phaser from 'phaser';
import BackgroundImage from '../../../assets/coca-bg2.png';
import Balloon from '../objects/balloon';
import Label from '../objects/gameLabel';
import CorkIcon from '../../../assets/icons/coca-cola-cap2-removebg-preview 1.svg';
import TrophyIcon from '../../../assets/icons/Group.png';
import SkullIcecube from '../../../assets/images/skullIcecube.png';
import CocaIcecube from '../../../assets/images/bottleIcecube.png';
import BonusIcecube from '../../../assets/images/coinIcecube.png';
import GreenBalloon from '../../../assets/images/balloon.svg';
import BlueBalloon from '../../../assets/images/blue-balloon.svg';
import PurpleBalloon from '../../../assets/images/purple-ballon.svg';
import YellowBalloon from '../../../assets/images/yellow-balloon.svg';
import RedBalloon from '../../../assets/images/red-ballon.svg';
import Explosion from '../../../assets/images/spritesheet/explosion.png';
import { move } from '../../../utils/dropMovement';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this.score = 0; 
    this.place = 1; 
  }

  preload() {
    this.load.image('background', BackgroundImage);
    this.load.image('cork_icon', CorkIcon);
    this.load.image('trophy_icon', TrophyIcon);
    this.load.image('skull_icecube', SkullIcecube);
    this.load.image('coca_icecube', CocaIcecube);
    this.load.image('bonus_icecube', BonusIcecube);
    this.load.image('green_balloon', GreenBalloon);
    this.load.image('blue_balloon', BlueBalloon);
    this.load.image('yellow_balloon', YellowBalloon);
    this.load.image('purple_balloon', PurpleBalloon);
    this.load.image('red_balloon', RedBalloon);
    this.load.spritesheet('explosion',Explosion , {
      frameWidth: 16,  
      frameHeight: 16,
    });
  }

  create() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;


    this.background = this.add.image(canvasWidth / 2, canvasHeight / 2, 'background');
    this.background.setDisplaySize(canvasWidth, canvasHeight);

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }), // Adjust frame numbers
      frameRate: 20,
      repeat: 0
    });
  
    this.balloons = [
      new Balloon(this, canvasWidth / 2, canvasHeight, 'green_balloon', 70, 2), // Green balloon with speed 2
      new Balloon(this, canvasWidth / 2, canvasHeight, 'green_balloon', 70, 1),  // Green balloon with speed 3
      new Balloon(this, canvasWidth / 2, canvasHeight, 'green_balloon', 70, 1) 
    ];

  
    this.ice_cubes = [
      this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'skull_icecube').setInteractive(),
      this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'coca_icecube').setInteractive(),
      this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'bonus_icecube').setInteractive()
    ];

 
    this.scoreLabel = new Label(this, canvasWidth / 4, 30, `Score: ${this.score}`, {
      background: { backgroundColor: 'fffff', width: 100 }
    }, 'cork_icon');

    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place: ${this.place}st`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'trophy_icon');
  }

  update() {
 
    this.balloons.forEach(balloon => balloon.move(this));

   
    this.ice_cubes.forEach(ice_cube => {
      ice_cube.displayHeight = 80;
      ice_cube.displayWidth = 80;
      ice_cube.y += 1;
      if (ice_cube.y > this.sys.canvas.height) {
        ice_cube.y = 0;
        ice_cube.x = Phaser.Math.Between(0, this.sys.canvas.width);
      }
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
