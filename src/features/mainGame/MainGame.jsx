import { useEffect } from "react";
import Phaser from "phaser";

const MainGame = ({ config }) => {
  useEffect(() => {
    const game = new Phaser.Game(config);

    // Apply border radius to the canvas after it is created
    const applyCanvasStyles = () => {
      const canvas = document.querySelector('#game-container canvas');
      if (canvas) {
        canvas.style.borderRadius = '40px';
        canvas.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Optional: for additional style
      }
    };

    applyCanvasStyles();

    return () => game.destroy(true);
  }, [config]);

  return (
    <div 
      id="game-container" 
      className="main-container flex justify-center items-center" 
      style={{ borderRadius: '40px', overflow: 'hidden' }}
    ></div>
  );
}

export default MainGame;
