import TopBar from "../../components/TopBar";
import MenuDetailSection from "./MenuDetailSection";
import MenuHeroSection from "./MenuHeroSection";


const MainMenu = () => {
    return (
        <div className="main-container bg-gradient-light text-white">
        <TopBar title="" />
        <MenuHeroSection />
        <MenuDetailSection />
        </div>
    );
    }
export default MainMenu;