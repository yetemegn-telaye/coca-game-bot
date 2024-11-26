import MultipleCoinIcon from '../../assets/icons/warytlogo.png';
const Members = ({profilePic,name,currentScore})=>{
    return (
        <div className="flex flex-col items-center gap-1">
            <img src={profilePic} alt="icon" className="h-10 w-10"/>
            <p className="text-xs text-primary" >{name}</p>
            <div className='flex items-center gap-1 font-light'>
                <p style={{fontSize:'12px'}} className='text-primary'>{currentScore}</p>
                <img src={MultipleCoinIcon} className='w-5 h-4' alt="multiple-coin"/>
            </div>
        </div>
    )
}
export default Members;