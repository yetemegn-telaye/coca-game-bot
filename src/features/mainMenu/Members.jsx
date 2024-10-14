import MultipleCoinIcon from '../../assets/icons/multipleCoin.svg';
const Members = ({profilePic,name,currentScore})=>{
    return (
        <div className="flex flex-col items-center gap-1">
            <img src={profilePic} alt="icon" className="h-10 w-10"/>
            <p className="text-xs" >{name}</p>
            <div className='flex items-center gap-1 font-light'>
                <p style={{fontSize:'7px'}}>{currentScore}</p>
                <img src={MultipleCoinIcon} alt="multiple-coin"/>
            </div>
        </div>
    )
}
export default Members;