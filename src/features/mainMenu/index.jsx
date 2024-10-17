
import TopBar from "../../components/TopBar";
import MenuDetailSection from "./MenuDetailSection";
import MenuHeroSection from "./MenuHeroSection";
import { useEffect, useState } from "react";


const MainMenu = () => {
    // const [playerInfo, setPlayerInfo] = useState(null);

    // useEffect(() => {
    //   WebApp.ready();
  
    //   const user = WebApp.initDataUnsafe?.user;
  
    //   if (user) {
    //     const playerData = {
    //       username: user.username || 'Unknown Player',
    //       firstName: user.first_name || 'Player',
    //       lastName: user.last_name || '',
    //       id: user.id,
    //       score: 0, 
    //     };
  
    //     setPlayerInfo(playerData);
    //   }
  
      
    //   WebApp.setHeaderColor('#C92A2A');
    // }, []);
  
    return (
        <div className="main-container bg-gradient-light text-white">
        <TopBar title="" />
        <MenuHeroSection />
        <MenuDetailSection />
        </div>
    );
    }
export default MainMenu;