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
    return(
        <div className="flex flex-col gap-10 bg-gradient-secondary p-5 rounded-t-3xl mt-5">
            <div className="flex items-center justify-between my-1">
                <button className="text-black border border-black bg-transparent py-1 px-7 text-sm rounded-lg font-bold">Stats</button>
                <button className="text-gray-700 flex items-center text-sm font-bold">
                    <img src={TrophyBlack} alt="trophy" className="w-7 h-6"/>
                    Leader Board
                </button>
            </div>
           <div className='flex flex-col gap-3 mt-2'>
            <div className='text-sm flex items-center gap-2 text-black font-bold'>
            <h3>Achievement</h3>
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
            <div className='text-sm flex items-center gap-2 text-black font-bold'>
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