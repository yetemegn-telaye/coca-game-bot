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
import BigBalloon from '../../../assets/images/bigBalloon.svg';
import GoldenBalloon from '../../../assets/images/goldenBalloon.svg';
import { move } from '../../../utils/dropMovement';
import { normalBalloonProperties } from '../objects/properties/normal.balloon';
import { bigBalloonProperties } from '../objects/properties/bigBalloon';
import { smallBalloonProperties } from '../objects/properties/smallBalloon';
import { BombBalloonProperties } from '../objects/properties/bombBalloon';
import { ColorChangingBalloonProperties } from '../objects/properties/colorChangingBalloon';
import { inflatingBalloonProperties } from '../objects/properties/inflatingBalloon';
import { deflatingBalloonProperties } from '../objects/properties/deflatingBalloon';
import { goldenBalloonProperties } from '../objects/properties/goldenBalloon';
import PopSound from '../../../assets/sounds/pop-94319.mp3';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    var total_score = 0;
    total_score += this.score;

    this.score = 0; 
    this.place = 1; 
    this.lastSpawnTime = 0;
    this.spawnInterval = 1000;
    this.balloons = [];
  }

  preload() {
    this.load.image('background', BackgroundImage);
    this.load.audio('pop', PopSound);
    this.load.image('cork_icon', CorkIcon);
    this.load.image('trophy_icon', TrophyIcon);
    this.load.image('skull_icecube', SkullIcecube);
    this.load.image('coca_icecube', CocaIcecube);
    this.load.image('bonus_icecube', BonusIcecube);
    this.load.image('green_balloon', GreenBalloon);
    this.load.image('big_balloon', BigBalloon);
    this.load.image('golden_balloon', GoldenBalloon);
  }

  create() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;


    this.background = this.add.image(canvasWidth / 2, canvasHeight / 2, 'background');
    this.background.setDisplaySize(canvasWidth, canvasHeight);



    this.spawnBalloon();


    this.balloons = [
      new Balloon(this, canvasWidth / 2, canvasHeight, normalBalloonProperties), // Green balloon with speed 2
      new Balloon(this, canvasWidth / 2, canvasHeight, bigBalloonProperties), // Green balloon with speed 2
      new Balloon(this,  canvasWidth / 2, canvasHeight, smallBalloonProperties),
      new Balloon(this,  canvasWidth / 2, canvasHeight, BombBalloonProperties),
      new Balloon(this,  canvasWidth / 2, canvasHeight, ColorChangingBalloonProperties),
      // new Balloon(this,  canvasWidth / 2, canvasHeight, inflatingBalloonProperties),
      // // new Balloon(this,  canvasWidth / 2, canvasHeight, deflatingBalloonProperties),
      new Balloon(this,  canvasWidth / 2, canvasHeight, goldenBalloonProperties),
    ];

  
    this.ice_cubes = [
      this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'skull_icecube').setInteractive(),
      this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'coca_icecube').setInteractive(),
      this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'bonus_icecube').setInteractive()
    ];

 
    this.scoreLabel = new Label(this, canvasWidth / 4.5, 30, `Score: ${this.score}`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'cork_icon');

    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place: ${this.place}st`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'trophy_icon');
  }


  update(time, delta) {
 
  //   this.balloons.forEach(balloon => balloon.move(this)
  //   if(balloon.y < -balloon.height) {
  //     balloon.destroy();
  //     this.balloons.splice(index, 1);
  //   }
  // });

  this.balloons = this.balloons.filter(balloon => {
    balloon.move(this);
    if (balloon.y < -balloon.height) {
      balloon.destroy();
      return false;
    }
    return true;
  });

  if (time > this.lastSpawnTime + this.spawnInterval) {
    this.spawnBalloon();
    this.lastSpawnTime = time;
  }
  
    this.ice_cubes.forEach(ice_cube => {
      ice_cube.displayHeight = 70;
      ice_cube.displayWidth = 70;
      ice_cube.y += 1;
      if (ice_cube.y > this.sys.canvas.height) {
        ice_cube.y = 0;
        ice_cube.x = Phaser.Math.Between(0, this.sys.canvas.width);
      }
    });

    
    this.scoreLabel.setText(`Score: ${this.score}`);


    // this.score = 200; 
    // this.scoreLabel.setText(` ${this.score}`);

    // if (this.score > 500) {
    //   this.place = 2;
    // }
    // if (this.score > 1000) {
    //   this.place = 3;
    // }
    // this.placeLabel.setText(` ${this.place}${this.getPlaceSuffix(this.place)}`);
  }

  onBalloonPopped(points) {
    this.addScore(points);
  }

  
  addScore(points){
    // if(this.house_color === 'red'){
    this.score += points;
    this.scoreLabel.setText(`Score: ${this.score}`);


    if (this.score > 1000) {
      this.place = 3;
    } else if (this.score > 500) {
      this.place = 2;
    }
    this.placeLabel.setText(`Place: ${this.place}${this.getPlaceSuffix(this.place)}`);
  
  }

  getPlaceSuffix(place) {
    switch (place) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }


  spawnBalloon() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;
    const x = Phaser.Math.Between(0, canvasWidth);
    const balloonTypes = [
      normalBalloonProperties,
      bigBalloonProperties,
      smallBalloonProperties,
      BombBalloonProperties,
      ColorChangingBalloonProperties,
      goldenBalloonProperties
    ];
    const randomType = Phaser.Utils.Array.GetRandom(balloonTypes);
    const newBalloon = new Balloon(this, x, canvasHeight, randomType);
    this.balloons.push(newBalloon);
  }

}

export default GameScene;
