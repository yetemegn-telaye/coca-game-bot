import Crown1Icon from '../../assets/icons/winnercrown.png';
import Crown2Icon from '../../assets/icons/crown2.png';
import Crown3Icon from '../../assets/icons/crown3.png';
import Winner1Pic from '../../assets/images/winnerpic.png';
import Winner2Pic from '../../assets/images/win2nd.png';
import Winner3Pic from '../../assets/images/win3rd.png';
import CoinCapIcon from '../../assets/icons/warytlogo.png';

const winners = [
    {
        winnerPic: Winner1Pic,
        name: 'Selam Telaye',
        scoreValue: 700,
        place: '1'
    },
    {
        winnerPic: Winner2Pic,
        name: 'Daniel Kebede',
        scoreValue: 50,
        place: '2'
    },
    {
        winnerPic: Winner3Pic,
        name: 'Ashenafi Belay',
        scoreValue: 20,
        place: '3'
    }
];

const LeaderBoardTopSection = () => {
    return (
        <div className="flex justify-center items-center p-5 relative">
            
            <div className="flex flex-col justify-center items-center text-center absolute left-3 bottom-0">
                <img src={Crown2Icon} alt="crown" className="h-10 w-10 mr-8 relative top-4" />
                <img src={winners[1].winnerPic} alt="winner" className="h-10 w-10" />
                <div className="bg-white text-black px-1 pt-1 rounded-md flex flex-col items-center relative bottom-2" style={{fontSize:'9px'}}>
                    <p className="">{winners[1].name}</p>
                    <span className="flex items-center text-gray-500 font-bold">
                        {winners[1].scoreValue}
                        <img src={CoinCapIcon} alt="coin" className="w-4 h-4 ml-1" />
                    </span>
                </div>
            </div>

          
            <div className="flex flex-col justify-center items-center text-center">
                <img src={Crown1Icon} alt="crown" className="h-14 w-14 relative top-4 ml-14" />
                <img src={winners[0].winnerPic} alt="winner" className="h-20 w-20" />
                <div className="text-xs relative bottom-2 bg-white text-black px-1 pt-1 rounded-md flex flex-col items-center ">
                    <p className="font-bold">{winners[0].name}</p>
                    <span className="flex items-center text-xs text-gray-500 font-bold">
                        {winners[0].scoreValue}
                        <img src={CoinCapIcon} alt="coin" className="w-6 h-6 mt-1" />
                    </span>
                </div>
            </div>

           
            <div className="flex flex-col justify-center items-center text-center absolute right-2 top-28">
                <img src={Crown3Icon} alt="crown" className="h-10 w-10 relative top-3 ml-6" />
                <img src={winners[2].winnerPic} alt="winner" className="h-8 w-8" />
                <div className="bg-white text-black relative bottom-2 px-1 pt-1 rounded-md flex flex-col items-center mt-1" style={{fontSize: '7px'}}>
                    <p className="font-light" >{winners[2].name}</p>
                    <span className="flex items-center text-gray-500 font-bold">
                        {winners[2].scoreValue}
                        <img src={CoinCapIcon} alt="coin" className="w-4 h-4 ml-1" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoardTopSection;
