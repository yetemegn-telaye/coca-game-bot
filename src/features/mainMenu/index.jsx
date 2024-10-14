import TopBar from "../../components/TopBar";
import MenuDetailSection from "./MenuDetailSection";
import MenuHeroSection from "./MenuHeroSection";


const MainMenu = () => {
    return (
        <div className="main-container">
        <TopBar title="" />
        <MenuHeroSection />
        <MenuDetailSection />
        </div>
    );
    }
export default MainMenu;