import CoinCapIcon from '../../assets/icons/coca-cola-cap2-removebg-preview 1.svg';

const LeaderboardCard = ({player})=>{
    return(
        <div className={`bg-white text-black text-sm flex justify-between py-1 px-2 rounded-3xl  ${player.place === '4' ? 'border border-2 border-primary text-primary' : '' }`}>
            <div className="flex items-center gap-2">
            <p>{player.place}</p>
            <img src={player.playerImg} alt="player" className="w-10 h-10 rounded-full" />
            <p className="">{player.playerName}</p>
            </div>
           <div className='flex items-center'>
            <p>{player.scoreValue}</p>
            <img src={CoinCapIcon} alt="coin cap"  className='w-5 h-5 mt-1' />
           </div>
        </div>
    )
}
export default LeaderboardCard;