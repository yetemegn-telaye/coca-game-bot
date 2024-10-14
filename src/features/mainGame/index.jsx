import { useState } from 'react';
import Phaser from 'phaser';

import MainGame from './MainGame';
import GameScene from './scenes/gameScene';

const GameScreen = () => {
  const [score, setScore] = useState(0);

  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 320,
    height: 558,
   
    scene: new GameScene({ setScore }),
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE, // Adjust Phaser to resize according to container
      autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
    },
  };




  return (
    <div>
      <MainGame config={config} />
    </div>
  );
};

export default GameScreen;
