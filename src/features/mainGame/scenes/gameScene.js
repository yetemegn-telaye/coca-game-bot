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
import { normalBalloonProperties } from '../objects/properties/normal.balloon';
import { bigBalloonProperties } from '../objects/properties/bigBalloon';
import { smallBalloonProperties } from '../objects/properties/smallBalloon';
import { bombBalloonProperties } from '../objects/properties/bombBalloon';
import { colorChangingBalloonProperties } from '../objects/properties/colorChangingBalloon';
import { inflatingBalloonProperties } from '../objects/properties/inflatingBalloon';
import { deflatingBalloonProperties } from '../objects/properties/deflatingBalloon';
import { goldenBalloonProperties } from '../objects/properties/goldenBalloon';
import PopSound from '../../../assets/sounds/pop-94319.mp3';
import Explosion from '../../../assets/images/spritesheet/explosion.png';


class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    var total_score = 0;
    total_score += this.score;

    this.score = 0; 
    this.place = 1; 
    this.lastSpawnTime = 0;
    this.spawnInterval = 5000;
    this.balloons = [];

     
    this.scoreMultiplier = 1;
    this.poppedBalloonCounter = 0;
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

    // this.load.image('red_balloon', RedBalloon);

    // golden
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


 
    this.scoreLabel = new Label(this, canvasWidth / 4, 30, `Score: ${this.score}`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'cork_icon');

    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place: ${this.place}st`, {
      background: { backgroundColor: '#fffff', width: 100 }
    }, 'trophy_icon');


  }


  update(time) {


  this.balloons = this.balloons.filter(balloon => {
    // this.balloons.forEach((balloon, index) => {
    balloon.move(this); 

    return true;
  });

  // this.balloons.forEach(balloon => balloon.move(this));


  if (time > this.lastSpawnTime + this.spawnInterval) {
    this.spawnBalloon();
    this.lastSpawnTime = time;
  }
    
  }

  onBalloonPopped(points) {
    this.addScore(points);
  }

  
  addScore(points){
    var totalScore = this.properties.onPop;
    this.scoreLabel.setText(`Score: ${this.totalScore}`);
    
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


    let balloonType;

    if(this.score <= 2){
      balloonType = bombBalloonProperties;
      console.log(balloonType.speed, balloonType.alias);
    }else if(this.score <= 4){   // level 2
      balloonType = Phaser.Math.RND.pick([bombBalloonProperties, inflatingBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 1.3,
        score: 2
      };
      console.log(balloonType.speed, balloonType.score);
    }else if (this.score <= 6){  //level 3
      balloonType = Phaser.Math.RND.pick([normalBalloonProperties, smallBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 1.6,
        score: 3
      };
      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 8){  //level 4
      balloonType = Phaser.Math.RND.pick([bigBalloonProperties, smallBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 1.9,
        score: 4
      };
      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 10){   //level 5
      balloonType = Phaser.Math.RND.pick([bigBalloonProperties, smallBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 2.1,
        score: 5
      };
      if(balloonType.alias === 'golden_balloon'){
        balloonType = {
          ...balloonType,
          score: 10
        }
      };
      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 12){     //level 6
      balloonType = Phaser.Math.RND.pick([bigBalloonProperties, smallBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 2.3,
        score: 6
      };

      if(balloonType.alias === 'golden_balloon'){
        balloonType = {
          ...balloonType,
          score: 10
        }
      };

      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 14){   //level 7
      balloonType = Phaser.Math.RND.pick([normalBalloonProperties, smallBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 2.6,
        score: 7
      };

      if(balloonType.alias === 'golden_balloon'){
        balloonType = {
          ...balloonType,
          score: 10
        }
      };

      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 16){
      balloonType = Phaser.Math.RND.pick([normalBalloonProperties, smallBalloonProperties]);
      balloonType = {
        ...balloonType,
        speed: 2.8,
        score: 8
      };

      if(balloonType.alias === 'golden_balloon'){
        balloonType = {
          ...balloonType,
          score: 10
        }
      };

      console.log(balloonType.speed, balloonType.score);
    }
    else {
      balloonType = normalBalloonProperties;
      balloonType = {
        ...balloonType,
        speed: 3,
        score: 9
      };

      if(balloonType.alias === 'golden_balloon'){
        balloonType = {
          ...balloonType,
          score: 10
        }
      };

      console.log(balloonType.speed, balloonType.score);
    }


    const newBalloon = new Balloon(this, x, canvasHeight, balloonType);
    newBalloon.scene = this;
    this.balloons.push(newBalloon);
    
  }

  // console.log(this.spawnBalloons());

  getBalloons(){
    console.log(this.balloons);
    return this.balloons;
  }
}

export default GameScene;
