import { useEffect } from "react";
import Phaser from "phaser";

const MainGame = ({config}) => {
    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => game.destroy(true);
      }, [config]);
    
      return <div id="game-container" className="main-container"></div>;
    }
export default MainGame;