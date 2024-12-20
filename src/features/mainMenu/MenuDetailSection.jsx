import TrophyBlack from '../../assets/icons/trophy-black3.png';
import AchievementIcon1 from "../../assets/icons/achievement-1.svg";
import AchievementIcon2 from "../../assets/icons/achievement-2.svg";
import Achievement from './Achievement';
import SelamProfilePic from '../../assets/images/selam.png';
import DaniProfilePic from '../../assets/images/dani.png';
import DagiProfilePic from '../../assets/images/dagi.png';
import AshuProfilePic from '../../assets/images/ashu.png';
import AlexProfilePic from '../../assets/images/alex.png';
import Members from './Members';
import { useNavigate } from 'react-router-dom';


const achievements = [{
    tag: "Loyal Popper",
    icon: AchievementIcon1
},
{
    tag: "Serial Popper",
    icon: AchievementIcon2
}
];
const sharedMembers = [{
    name: "Selam",
    profilePic: SelamProfilePic,
    currentScore: 500
},
{
    name: "Dani",
    profilePic: DaniProfilePic,
    currentScore: 200
},
{
    name: "Dagi",
    profilePic: DagiProfilePic,
    currentScore: 420
},
{
    name: "Alex",
    profilePic: AlexProfilePic,
    currentScore: 300
},
{
    name: "Ashu",
    profilePic: AshuProfilePic,
    currentScore: 400
},
];
const MenuDetailSection =()=>{
    const navigate = useNavigate();
    return(
        <div className="flex flex-col gap-8 bg-gradient-secondary p-5 mt-5">
            <div className="flex items-center justify-between my-1">
                <button className="text-primary border border-primary bg-transparent py-1 px-7 text-sm rounded-lg font-bold">Stats</button>
                <button className="text-primary flex items-center text-sm font-bold hover:text-black" onClick={()=>navigate('/leaderboard')}>
                    <img src={TrophyBlack} alt="trophy" className="w-7 h-6"/>
                    Leader Board
                </button>
            </div>
           <div className='flex flex-col gap-3 mt-2'>
            <div className='text-sm flex items-center gap-2 text-primary font-bold'>
            <h3 className='text-primary'>Achievement</h3>
            <span>(2)</span>
            </div>
            <div className='flex items-center gap-4'>
            {achievements.map((achievement, index) => (
                <Achievement key={index} tag={achievement.tag} icon={achievement.icon} />  
            ))  
            }
            </div>
           </div>
           <div className='flex flex-col gap-4'>
            <div className='text-sm flex items-center gap-2 text-primary font-bold'>
            <h3>Shared Members</h3>
            <span>(5)</span>
            </div>
            <div className='flex items-center justify-between'>
            {sharedMembers.map((member, index) => (
                <Members key={index} name={member.name} profilePic={member.profilePic} currentScore={member.currentScore} />  
            ))  
            }
            </div>
           </div>
        </div>
    )
}
export default MenuDetailSection;