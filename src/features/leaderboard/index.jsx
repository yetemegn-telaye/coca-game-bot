import TopBar from "../../components/TopBar";
import LeaderBoardTopSection from "./LeaderboardTopSection";
import Chair from '../../assets/bluechair-removebg-preview.png';
import LeaderboardCard from "./LeaderboardCard";
import PlayerPic1 from '../../assets/images/alex.png';
import PlayerPic2 from '../../assets/images/ashu.png';
import PlayerPic3 from '../../assets/images/dagi.png';
import PlayerPic4 from '../../assets/images/dani.png';


const players = [
    {
        playerName: 'Ayele Dan',
        place: '4',
        playerImg: PlayerPic1,
        scoreValue: 300
    },
    {
        playerName: 'Daniel Kebede',
        place: '5',
        playerImg: PlayerPic2,
        scoreValue: 50
    },
    {
        playerName: 'Ashenafi Belay',
        place: '6',
        playerImg: PlayerPic3,
        scoreValue: 20
    },
    {
        playerName: 'Dagmawi Abebe',
        place: '7',
        playerImg: PlayerPic4,
        scoreValue: 20
    }

]

const LeaderBoard = ()=>{
    return(
        <div className="main-container bg-gradient-primary">
           <TopBar title="LeaderBoard" />
           <LeaderBoardTopSection />
           <div className="flex flex-col items-center relative">
                <img src={Chair} alt="coca" style={{height:'240px', width:"240px"}} />
           </div>
           <div className="flex flex-col gap-3 px-3 pb-5">
           {players.map((player,index)=>
            <LeaderboardCard key={index} player={player} />
           )}
           </div>
         
        </div>
    )
}
export default LeaderBoard;