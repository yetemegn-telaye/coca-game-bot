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
import { bonusIceCubeProperties } from '../objects/properties/bonusIceCube';
import PopSound from '../../../assets/sounds/pop-94319.mp3';
import Explosion from '../../../assets/images/spritesheet/explosion.png';
import { skullIceCubeProperties } from '../objects/properties/skullIceCube';
import { cocaIceCubeProperties } from '../objects/properties/cocaIceCube';


class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    var total_score = 0;
    total_score += this.score;

    this.score = 0; 
    this.place = 1; 
    this.lastSpawnTime = 0;
    this.spawnInterval = 8000;
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


    // this.ice_cubes = [
    //   this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'skull_icecube').setInteractive(),
    //   this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'coca_icecube').setInteractive(),
    //   this.add.image(Phaser.Math.Between(0, canvasWidth), Phaser.Math.Between(0, canvasHeight), 'bonus_icecube').setInteractive()
    // ];

 
    this.scoreLabel = new Label(this, canvasWidth / 4, 30, `Score:${this.score}`, {
      background: { backgroundColor: '#fffff', width: 120 }
    }, 'cork_icon');

    this.placeLabel = new Label(this, (3 * canvasWidth) / 4, 30, `Place:${this.place}st`, {
      background: { backgroundColor: '#fffff', width: 120 }
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
    

  // this.ice_cubes.forEach(ice_cube => {
  //   ice_cube.displayHeight = 80;
  //   ice_cube.displayWidth = 80;
  //   ice_cube.y += 1;
  //   if (ice_cube.y > this.sys.canvas.height) {
  //     ice_cube.y = 0;
  //     ice_cube.x = Phaser.Math.Between(0, this.sys.canvas.width);
  //   }
  // });


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



  getWeightedRandomBalloonType(balloonTypesWithWeights) {
    // balloonTypesWithWeights ==  an array of objects, where each object contains a balloonType and its associated weight
    // balloonTypesWithWeights = [{balloonType, weight: 1}, { balloonType, weight: 2 }]
    // reduce() -- iterates through each object and adds up all the weight values
    // produce a random integer between 0 and totalWeight - 1
    const totalWeight = balloonTypesWithWeights.reduce((sum, { weight }) => sum + weight, 0);
    let random = Phaser.Math.Between(0, totalWeight - 1);

    for (const { balloonType, weight } of balloonTypesWithWeights) {
        if (random < weight) {
            return balloonType;
        }
        random -= weight;
    }
  }


  spawnBalloon() {
    
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;
    const x = Phaser.Math.Between(0, canvasWidth);


    let balloonType;

    if(this.score <= 2){
      const balloonTypesWithWeights = [
        { balloonType: cocaIceCubeProperties, weight: 100 },
        // { balloonType: skullIceCubeProperties, weight: 50 },
        // { balloonType: bonusIceCubeProperties, weight: 50 },
      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);
      if(balloonType.alias === 'bonus_ice_cube'){
        this.scoreMultiplier = 3;
      }


      console.log(balloonType.alias, balloonType.size);
    }else if(this.score <= 4){   // level 2
      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 90 },
        { balloonType: bombBalloonProperties, weight: 10 }
      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 1.3,
        score: 2
      };
      console.log(balloonType.alias);
    }else if (this.score <= 6){  //level 3

      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 80 },
        { balloonType: bigBalloonProperties, weight: 10 },
        { balloonType: bombBalloonProperties, weight: 10 }

      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);


      // balloonType = Phaser.Math.RND.pick([normalBalloonProperties, smallBalloonProperties]);
      

      balloonType = {
        ...balloonType,
        speed: 1.6,
        score: 3
      };
      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 8){  //level 4
      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 70 },
        { balloonType: bigBalloonProperties, weight: 10 },
        { balloonType: bombBalloonProperties, weight: 10 },
        { balloonType: smallBalloonProperties, weight: 10 }


      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 1.9,
        score: 4
      };

      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 10){   //level 5
      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 60 },
        { balloonType: bigBalloonProperties, weight: 10 },
        { balloonType: bombBalloonProperties, weight: 10 },
        { balloonType: smallBalloonProperties, weight: 10 },
        { balloonType: goldenBalloonProperties, weight: 10 }

      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 2.1,
        score: 5
      };

      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 12){     //level 6
      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 50 },
        { balloonType: bigBalloonProperties, weight: 20 },
        { balloonType: bombBalloonProperties, weight: 10 },
        { balloonType: smallBalloonProperties, weight: 10 },
        { balloonType: goldenBalloonProperties, weight: 10 }
      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 2.3,
        score: 6
      };


      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 14){   //level 7
      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 40 },
        { balloonType: bigBalloonProperties, weight: 20 },
        { balloonType: bombBalloonProperties, weight: 20 },
        { balloonType: smallBalloonProperties, weight: 10 },
        { balloonType: goldenBalloonProperties, weight: 10 }

      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 2.6,
        score: 7
      };


      console.log(balloonType.speed, balloonType.score);
    }else if(this.score <= 16){

      const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 40 },
        { balloonType: bigBalloonProperties, weight: 20 },
        { balloonType: bombBalloonProperties, weight: 20 },
        { balloonType: smallBalloonProperties, weight: 10 },
        { balloonType: goldenBalloonProperties, weight: 10 }

      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 2.8,
        score: 8
      };


      console.log(balloonType.speed, balloonType.score);
    }
    else {
        const balloonTypesWithWeights = [
        { balloonType: normalBalloonProperties, weight: 40 },
        { balloonType: bigBalloonProperties, weight: 10 },
        { balloonType: bombBalloonProperties, weight: 20 },
        { balloonType: smallBalloonProperties, weight: 10 },
        { balloonType: goldenBalloonProperties, weight: 20 }

      ];

      balloonType = this.getWeightedRandomBalloonType(balloonTypesWithWeights);

      balloonType = {
        ...balloonType,
        speed: 3,
        score: 9
      };


      console.log(balloonType.speed, balloonType.score);
    }


    const newBalloon = new Balloon(this, x, canvasHeight, balloonType);
    newBalloon.scene = this;
    this.balloons.push(newBalloon);
    
  }

  // console.log(this.spawnBalloons());


}

export default GameScene;
