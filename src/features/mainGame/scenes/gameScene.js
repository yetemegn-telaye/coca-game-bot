import Phaser from "phaser";
// import BackgroundImage from "../../../assets/coca-bg2.png";
import BackgroundImage from "../../../assets/sky-blue.jpg";
import Balloon from "../objects/balloon";
import Label from "../objects/gameLabel";

import CorkIcon from "../../../assets/icons/warytlogo.png";
import TrophyIcon from "../../../assets/icons/Group.png";
import SkullIcecube from "../../../assets/images/skullIcecube.png";
import CocaIcecube from "../../../assets/images/bottleIcecube.png";
import BonusIcecube from "../../../assets/images/coinIcecube.png";
import GreenBalloon from "../../../assets/images/balloons/balloongreen.png";
import BigBalloon from "../../../assets/images/bigBalloon.svg";
import GoldenBalloon from "../../../assets/images/balloons/balloongolden.png";
import BlueBalloon from "../../../assets/images/balloons/balloonblue.png";
import PurpleBalloon from "../../../assets/images/purpleBalloon.svg";
import BrownBalloon from "../../../assets/images/brownBalloon.svg";
import RedBalloon from "../../../assets/images/balloon_red2.png";
import BlackBalloon from "../../../assets/images/bombbal.png";

import { move } from "../../../utils/dropMovement";
import {
  normalBalloonProperties,
  bigBalloonProperties,
  smallBalloonProperties,
  bombBalloonProperties,
  colorChangingBalloonProperties,
  inflatingBalloonProperties,
  deflatingBalloonProperties,
  goldenBalloonProperties,
  bonusIceCubeProperties,
  skullIceCubeProperties,
  cocaIceCubeProperties,
} from "../objects/properties";

import PopSound from "../../../assets/sounds/pop-94319.mp3";
import BgMusic from "../../../assets/sounds/harar-beer-ballon-game-background-music.mp3";
import Explosion from "../../../assets/images/spritesheet/explosion.png";
// import Explosion from "../../../assets/images/spritesheet/balloon_redpack.png";
import BoomSound from "../../../assets/sounds/explosion-91872.mp3";

import ShoutYeah from "../../../assets/sounds/shouting-yeah-7043.mp3";
import OhOhSound from "../../../assets/sounds/uh-oh-101117.mp3";
import { useNavigate } from "react-router-dom";

class GameScene extends Phaser.Scene {
  
  constructor(config) {
    super(config);
    this.score = 0;

    this.place = 1;
    this.lastSpawnTime = 0;
    this.spawnInterval = 1000;
    this.balloons = [];
    this.scoreMultiplier = 1;
    this.scoreMultiplierOn = false;
    this.bonusOnScreen = false;

    this.musicPlaying = false;
    this.gameOver = false;
  }

 
  preload() {
    this.load.image("background", BackgroundImage);
    this.load.audio("pop", PopSound);
    this.load.audio("bgMusic", BgMusic);
    this.load.image("cork_icon", CorkIcon);
    this.load.image("trophy_icon", TrophyIcon);
    this.load.image("skull_icecube", SkullIcecube);
    this.load.image("coca_icecube", CocaIcecube);

    this.load.image("bonus_icecube", BonusIcecube);
    this.load.image("green_balloon", GreenBalloon);
    this.load.image("big_balloon", BigBalloon);
    this.load.image("golden_balloon", GoldenBalloon);
    this.load.image("red_balloon", RedBalloon);
    this.load.image("purple_balloon", PurpleBalloon);
    this.load.image("blue_balloon", BlueBalloon);
    this.load.image("bomb_balloon", BlackBalloon);
    this.load.image("brown_balloon", BrownBalloon);

    this.load.audio("boom", BoomSound);
    this.load.audio("shoutYeah", ShoutYeah);
    this.load.audio("uhOh", OhOhSound);
    this.load.spritesheet("explosion", Explosion, {
      frameWidth: 16,
      frameHeight: 16,
    });
  
  }

  create() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;

    this.screenShake = (intensity = 0.01, duration = 200) => {
      this.cameras.main.shake(duration, intensity);
    };

    this.showBonusFloatingText = (points, x, y) => {
      const bonusText = this.add
        .text(x, y, `+${points}`, {
          fontSize: "20px",
          color: "#f2cc05",
          fontStyle: "bold",
        })
        .setOrigin(0.5)
        .setScale(0);

     
      this.tweens.add({
        targets: bonusText,
        scale: 2,
        duration: 700,
        ease: "Back.easeOut",
        onComplete: () => {
          
          this.tweens.add({
            targets: bonusText,
            y: y - 50, 
            alpha: 0, 
            duration: 800,
            scale: 1,
            ease: "Power1",
            onComplete: () => bonusText.destroy(),
          });
        },
      });
    };

    this.showLevelUpEffect = (text = "BONUS", color = "FFD700") => {
      const canvasWidth = this.sys.canvas.width;
      const canvasHeight = this.sys.canvas.height;

      const levelUpText = this.add
        .text(canvasWidth / 2, canvasHeight / 2, text, {
          fontSize: "60px",
          color: color,
          fontStyle: "bold",
          fontFamily: "Arial",
          stroke: "#000000",
          strokeThickness: 8,
        })
        .setOrigin(0.5)
        .setScale(0)
        .setRotation(Phaser.Math.DegToRad(-30)); 

     
      this.tweens.add({
        targets: levelUpText,
        scale: 1,
        rotation: Phaser.Math.DegToRad(-45), 
        duration: 500,
        yoyo: true,
        ease: "Bounce.easeOut",
        onComplete: () => {
          this.tweens.add({
            targets: levelUpText,
            alpha: 0, // Fade out
            duration: 800,
            ease: "Power1",
            onComplete: () => levelUpText.destroy(), 
          });
        },
      });

      
      const particles = this.add.particles("spark");

      this.time.delayedCall(500, () => {
        particles.destroy();
      });
    };
    this.showFloatingScore = (points, x, y) => {
      const floatingText = this.add
        .text(x, y, `+${points}`, {
          fontSize: "20px",

          color: "#2e2727",
          fontStyle: "bold",
        })
        .setOrigin(0.5);

      // Animate the floating text to move up and fade out

      this.tweens.add({
        targets: floatingText,
        y: y - 50, // Move up by 50 pixels
        alpha: 0, // Fade out
        duration: 7000,
        ease: "Cubic.easeOut",
        onComplete: () => floatingText.destroy(), // Destroy text after animation
      });
    };

    this.background = this.add
      .image(canvasWidth / 2, canvasHeight / 2, "background")
      .setDisplaySize(canvasWidth, canvasHeight);

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 3,
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.scoreLabel = new Label(
      this,
      canvasWidth / 4,
      30,
      `Score: ${this.score}`,
      { background: { backgroundColor: "#ffffff", width: 120 } },
      "cork_icon"
    );
    this.placeLabel = new Label(
      this,
      (3 * canvasWidth) / 4,
      30,
      `Place: ${this.place}st`,
      { background: { backgroundColor: "#ffffff", width: 120 } },
      "trophy_icon"
    );
    this.spawnBalloon();
  }

  update(time) {
    if (this.gameOver) return; // Prevent further updates if the game is over
  
    if (!this.musicPlaying) {
      this.musicPlaying = true;
      this.sound.play("bgMusic", { loop: true });
    }
  
    if (this.scoreMultiplierOn) {
      this.scoreLabel.setBorderColor("#FFD700");
    }
  
    // Handle balloon movement and destruction, but do not update the score when game over
    this.balloons = this.balloons.filter((balloon) => {
      if (balloon.y <= 0) {
        balloon.destroy();
        if(!this.gameOver){
          this.onBalloonMissed(); 
        } 
        return false; 
      }
  
      balloon.move(this);
      return true;
    });
  
    // Balloon spawn interval logic (game over should not spawn new balloons)
    if (time > this.lastSpawnTime + this.spawnInterval && !this.gameOver) {
      this.spawnBalloon();
      this.lastSpawnTime = time;
    }
  }

  resetGame() {
    // Reset game state variables
    this.score = 0;
    this.scoreLabel.setText(`Score: ${this.score}`);
    this.gameOver = false;
  
    // Clear any existing balloons and restart the balloon generation
    this.balloons.forEach((balloon) => balloon.destroy());
    this.balloons = [];
  
    // Optionally, reset other game state variables like multiplier, bonus
    this.scoreMultiplierOn = false;
    this.bonusOnScreen = false;
  
    // Restart background music
    this.sound.play("bgMusic", { loop: true });
  
    // Hide game-over UI elements
    this.children.getAll().forEach((child) => {
      if (child.depth >= 10) {
        child.destroy();
      }
    });
  
    // Start spawning balloons again
    this.spawnBalloon();
  }
  
  
  onBalloonMissed() {
    if (this.gameOver) return; // Prevent duplicate calls or changes when the game is already over
  
    // End the game
    this.gameOver = true;
  
    // Stop and destroy all balloons
    this.balloons.forEach((balloon) => balloon.destroy());
    this.balloons = [];
  
    // Stop all sounds
    this.sound.stopAll();
  
    // Display the game over screen
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;
  
    const overlay = this.add
      .graphics()
      .fillStyle(0x000000, 0.7)
      .fillRect(0, 0, canvasWidth, canvasHeight);
  
    const boxWidth = 300;
    const boxHeight = 340;
    const boxX = canvasWidth / 2 - boxWidth / 2;
    const boxY = canvasHeight / 2 - boxHeight / 2;
  
    const box = this.add
      .graphics()
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20);
  
    const gameOverTextY = canvasHeight / 2 - 120;
    const replayButtonY = canvasHeight / 2;
  
    const gameOverText = this.add
      .text(canvasWidth / 2, gameOverTextY, "Game Over", {
        fontSize: "32px",
        color: "#0F4C98",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);
 
    const currentScoreTextY = (gameOverTextY + replayButtonY) / 2;
  
    const currentScoreText = this.add
      .text(canvasWidth / 2, currentScoreTextY, `Score: ${this.score}`, {
        fontSize: "32px",
        color: "#FF0000",
        fontStyle: "light",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    const createButton = (text, x, y, callback) => {
      const buttonWidth = 200;
      const buttonHeight = 50;
  
      const buttonBg = this.add.graphics();
      buttonBg
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(
          x - buttonWidth / 2,
          y - buttonHeight / 2,
          buttonWidth,
          buttonHeight,
          10
        )
        .lineStyle(3, 0x0000ff)
        .strokeRoundedRect(
          x - buttonWidth / 2,
          y - buttonHeight / 2,
          buttonWidth,
          buttonHeight,
          10
        );
  
      const buttonText = this.add
        .text(x, y, text, {
          fontSize: "20px",
          color: "#0F4C98",
          fontStyle: "bold",
          fontFamily: "Arial",
        })
        .setOrigin(0.5);
  
      buttonBg.setInteractive(
        new Phaser.Geom.Rectangle(
          x - buttonWidth / 2,
          y - buttonHeight / 2,
          buttonWidth,
          buttonHeight
        ),
        Phaser.Geom.Rectangle.Contains
      );
  
      buttonBg.on("pointerover", () => {
        buttonBg.clear();
        buttonBg
          .fillStyle(0xe0e0e0, 1)
          .fillRoundedRect(
            x - buttonWidth / 2,
            y - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            10
          )
          .lineStyle(3, 0x000000)
          .strokeRoundedRect(
            x - buttonWidth / 2,
            y - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            10
          );
      });
  
      buttonBg.on("pointerout", () => {
        buttonBg.clear();
        buttonBg
          .fillStyle(0xffffff, 1)
          .fillRoundedRect(
            x - buttonWidth / 2,
            y - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            10
          )
          .lineStyle(3, 0x000000)
          .strokeRoundedRect(
            x - buttonWidth / 2,
            y - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            10
          );
      });
  
      buttonBg.on("pointerdown", callback);
  
      return { buttonBg, buttonText };
    };
  
    const replayButton = createButton(
      "Replay",
      canvasWidth / 2,
      replayButtonY,
      () => {
        this.resetGame();
      }
    );
  
    const exitButton = createButton(
      "Exit",
      canvasWidth / 2,
      canvasHeight / 2 + 80,
      () => {
        this.scene.stop();
        this.scene.start("MainMenuScene");
      }
    );
  
    overlay.setDepth(10);
    box.setDepth(11);
    gameOverText.setDepth(12);
    currentScoreText.setDepth(12);
    replayButton.buttonBg.setDepth(12);
    replayButton.buttonText.setDepth(13);
    exitButton.buttonBg.setDepth(12);
    exitButton.buttonText.setDepth(13);
  }
  
  
  addScore(points) {
    this.score += points;
    this.scoreLabel.setText(`Score: ${this.score}`);
  }

  getWeightedRandomBalloonType(balloonTypesWithWeights) {
    const totalWeight = balloonTypesWithWeights.reduce(
      (sum, { weight }) => sum + weight,
      0
    );
    let random = Phaser.Math.Between(0, totalWeight - 1);

    for (const { balloonType, weight } of balloonTypesWithWeights) {
      if (random < weight) return balloonType;
      random -= weight;
    }
  }

  spawnBalloon() {
    const canvasWidth = this.sys.canvas.width;
    const canvasHeight = this.sys.canvas.height;
    const x = Phaser.Math.Between(20, canvasWidth - 20);
    const y = canvasHeight;
    

    const levels = [
      { maxScore: 1, types: [] },
      {
        maxScore: 5,
        types: [{ balloonType: bonusIceCubeProperties, weight: 90 }],
      },

      {
        maxScore: Infinity,
        types: [
          { balloonType: bonusIceCubeProperties, weight: 5 },
          { balloonType: skullIceCubeProperties, weight: 25 },
        ],
      },
    ];

    levels.map((level) => {
      const totalWeight = level.types.reduce(
        (sum, { weight }) => sum + weight,
        0
      );
      level.types.push({
        balloonType: normalBalloonProperties,
        weight: 100 - totalWeight,
      });
      return level;
    });

    // if(this.scoreMultiplierOn || this.balloons.some(balloon => balloon.properties.type === 'bonus')){
    //   this.balloons = this.balloons.filter(balloon => balloon.properties.type !== 'bonus');
    // }

    const level = levels.find((lvl) => this.score <= lvl.maxScore);

    var balloonType = this.getWeightedRandomBalloonType(level.types);
    while (balloonType.type == "bonus" && (this.scoreMultiplierOn)){
       balloonType = this.getWeightedRandomBalloonType(level.types);
    }
    const newBalloon = new Balloon(this, x, y, {
      ...balloonType,
      speed: level.speed || 1,
      score: level.score || 1,
    });
    console.log(this.balloons);
    newBalloon.scene = this;
    this.balloons.push(newBalloon);

    this.bonusOnScreen = true;
  }
}
export default GameScene;
