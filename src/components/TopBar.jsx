import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faGear} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TopBar = ({title}) => {  
    const navigate = useNavigate();
    return (
        <div className="bg-transparent w-full flex justify-between items-center px-5 py-3">
            <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faChevronLeft} className='hover:cursor-pointer hover:text-black' onClick={()=>{navigate(-1)}}/>
            <p className='text-sm font-bold'>{title}</p>
            </div>
            <FontAwesomeIcon icon={faGear}/>
        </div>
    );
    }
export default TopBar;