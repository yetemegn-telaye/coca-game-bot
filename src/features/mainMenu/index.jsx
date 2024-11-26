

import { WebApp } from "@grammyjs/web-app";
import TopBar from "../../components/TopBar";
import MenuDetailSection from "./MenuDetailSection";
import MenuHeroSection from "./MenuHeroSection";
import { useEffect, useState } from "react";


const MainMenu = () => {
  

     useEffect(() => {
        WebApp.ready();
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
          
            tg.setHeaderColor('#0F4C98');
            
          } else {
            console.error("Telegram WebApp is not available.");
          }
     }, []);
  
    return (
        <div className="main-container bg-gradient-light text-white">
        <TopBar title="" />
        <MenuHeroSection />
        <MenuDetailSection />
        </div>
    );
    }
export default MainMenu;