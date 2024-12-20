import ProfilePic from '../../assets/images/Avatar.png';
import CoinCapIcon from '../../assets/icons/warytlogo.png';
import TrophyWhite from '../../assets/icons/trophy-white.svg';
import { useNavigate } from 'react-router-dom';
const MenuHeroSection = () => {
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center gap-4 bg-hero-image bg-no-repeat bg-center pt-3 bg-contain" style={{backgroundSize:'60%'}}>
            <div className='flex flex-col items-center justify-center gap-2'>
                <img src={ProfilePic} alt="profile" className='w-20 h-20'/>
                <p className='text-xs'>Ayantu Lemma</p>
            </div>
            <div className='flex items-center gap-3 justify-center'>
                {/* <button className='flex font-light items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded-md' style={{fontSize:'8px'}}>
                    House<br/>Card
                     <div className='h-2 w-2 rounded-full bg-primary text-transparent'></div>
                </button> */}
                <button className='text-base flex items-center gap-1 bg-white bg-opacity-30 px-2 py-1 rounded-md'>700
                     <img src={CoinCapIcon} alt="coin" className='w-7 h-7'/>
                </button>
                <button className='text-sm flex items-center gap-1 font-bold px-2 rounded-md'>
                     <img src={TrophyWhite} alt="coin" className='w-5 h-5'/>
                     3rd
                </button>
            </div>
            <div className='flex flex-col items-center justify-center gap-3'>
                <button className='border border-white py-1 rounded-md px-14' onClick={()=>navigate('/game-screen')}>Play</button>
                <button className='border border-white py-1 rounded-md px-14'>Invite Friends</button>
                <p className='font-extralight' style={{fontSize:'8px'}}>Invite friends and earn 500 caps!</p>
            </div>
        </div>
    );
}
export default MenuHeroSection;