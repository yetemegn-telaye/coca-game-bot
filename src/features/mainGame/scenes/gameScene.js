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
import BlueBalloon from '../../../assets/images/blueBalloon.svg';
import PurpleBalloon from '../../../assets/images/purpleBalloon.svg';
import BrownBalloon from '../../../assets/images/brownBalloon.svg';
import RedBalloon from '../../../assets/images/redBalloon.svg';

import { move } from '../../../utils/dropMovement';
import { normalBalloonProperties, bigBalloonProperties, smallBalloonProperties, bombBalloonProperties, colorChangingBalloonProperties, inflatingBalloonProperties, deflatingBalloonProperties, goldenBalloonProperties, bonusIceCubeProperties, skullIceCubeProperties, cocaIceCubeProperties } from '../objects/properties';

import PopSound from '../../../assets/sounds/pop-94319.mp3';
import Explosion from '../../../assets/images/spritesheet/explosion.png';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this.score = 0;
    this.place = 1;
    this.lastSpawnTime = 0;
    this.spawnInterval = 5000;
    this.balloons = [];
    this.scoreMultiplier = 1;
    this.scoreMultiplierOn = false;
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
    this.load.image('red_balloon', RedBalloon);
    this.load.image('purple_balloon', PurpleBalloon);
    this.load.image('blue_balloon', BlueBalloon);
    this.load.image('brown_balloon', BrownBalloon);

    this.load.spritesheet('explosion', Explosion, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;

    this.background = this.add.image(canvasWidth / 2, canvasHeight / 2, 'background').setDisplaySize(canvasWidth, canvasHeight);

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
      frameRate: 20,

      repeat: 0,
    });

    this.scoreLabel = new Label(this, canvasWidth / 4, 30, `Score: ${this.score}`, { background: { backgroundColor: '#ffffff', width: 120 } }, 'cork_icon');
    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place: ${this.place}st`, { background: { backgroundColor: '#ffffff', width: 120 } }, 'trophy_icon');

  }

  update(time) {
    this.balloons = this.balloons.filter(balloon => {
      balloon.move(this);
      return true;
    });

    if (time > this.lastSpawnTime + this.spawnInterval) {
      this.spawnBalloon();
      this.lastSpawnTime = time;
    }
  }

  addScore(points) {
    this.score += points;
    this.scoreLabel.setText(`Score: ${this.score}`);
  }

  getWeightedRandomBalloonType(balloonTypesWithWeights) {
    const totalWeight = balloonTypesWithWeights.reduce((sum, { weight }) => sum + weight, 0);
    let random = Phaser.Math.Between(0, totalWeight - 1);


    for (const { balloonType, weight } of balloonTypesWithWeights) {

      if (random < weight) return balloonType;
      random -= weight;
    }
  }

  spawnBalloon() {
    const canvasWidth = this.sys.canvas.width;
    const x = Phaser.Math.Between(0, canvasWidth);
    const levels = [
      { maxScore: 2, types: [] },
      { maxScore: 4, types: [ { balloonType: bonusIceCubeProperties, weight: 50 }], speed: 1.3, score: 2 },
      // { maxScore: 6, types: [ { balloonType: bigBalloonProperties, weight: 10 }, { balloonType: bombBalloonProperties, weight: 10 }], speed: 1.6, score: 3 },
      // { maxScore: 8, types: [ { balloonType: bigBalloonProperties, weight: 10 }, { balloonType: bombBalloonProperties, weight: 10 }, { balloonType: smallBalloonProperties, weight: 10 }], speed: 1.9, score: 4 },
      // { maxScore: 10, types: [ { balloonType: bigBalloonProperties, weight: 10 }, { balloonType: bombBalloonProperties, weight: 10 }, { balloonType: goldenBalloonProperties, weight: 10 }], speed: 2.1, score: 5 },
      // { maxScore: 12, types: [ { balloonType: bigBalloonProperties, weight: 20 }, { balloonType: bombBalloonProperties, weight: 10 }, { balloonType: goldenBalloonProperties, weight: 10 }], speed: 2.3, score: 6 },
      // { maxScore: 14, types: [ { balloonType: bigBalloonProperties, weight: 20 }, { balloonType: bombBalloonProperties, weight: 20 }], speed: 2.6, score: 7 },

      // { maxScore: 16, types: [ { balloonType: bigBalloonProperties, weight: 20 }, { balloonType: bombBalloonProperties, weight: 20 }], speed: 2.8, score: 8 },
      // { maxScore: Infinity, types: [{ balloonType: bigBalloonProperties, weight: 10 }, { balloonType: bombBalloonProperties, weight: 20 }, { balloonType: goldenBalloonProperties, weight: 20 }], speed: 3, score: 9 },
    ];





    levels.map(level=>{
       //sum up the weights of the balloon types

      const totalWeight = level.types.reduce((sum, { weight }) => sum + weight, 0);

        //push normal balloon properties to the types array
       level.types.push({ balloonType: normalBalloonProperties, weight: 100 - totalWeight });
       return level;
    })


    const level = levels.find(lvl => this.score <= lvl.maxScore);

    console.log(level);

    // //if this.ballons contains a ballon with balloon.type = 'bonus' the filter out the bonusIceCubeProperties from the level.types array
    // if(this.balloons.some(balloon=>balloon.properties.type === 'bonus')){
    //   alert("Double Bonus")
    // }

    alert(JSON.stringify(level.types));

    const balloonType = this.getWeightedRandomBalloonType(level.types);
    console.log('weighted',balloonType);

    const newBalloon = new Balloon(this, x, this.sys.canvas.height, { ...balloonType, speed: level.speed || 1, score: level.score || 1 });

    newBalloon.scene = this;
    this.balloons.push(newBalloon);
  }
}
export default GameScene;