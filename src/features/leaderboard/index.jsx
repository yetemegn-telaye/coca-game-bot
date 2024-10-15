import TopBar from "../../components/TopBar";
import LeaderBoardTopSection from "./LeaderboardTopSection";

const LeaderBoard = ()=>{
    return(
        <div className="main-container bg-gradient-primary px-3">
           <TopBar title="LeaderBoard" />
           <LeaderBoardTopSection />
        </div>
    )
}
export default LeaderBoard;