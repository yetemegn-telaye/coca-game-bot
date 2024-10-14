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
    height: 600,
   
    scene: new GameScene({ setScore }),
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
  };




  return (
    <div className='main-container'>
      <MainGame config={config} />
    </div>
  );
};

export default GameScreen;
