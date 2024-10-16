import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faGear} from '@fortawesome/free-solid-svg-icons';

const TopBar = ({title}) => {  
    return (
        <div className="flex justify-between items-center px-5 py-4">
            <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faChevronLeft} />
            <p className='text-sm font-bold'>{title}</p>
            </div>
            <FontAwesomeIcon icon={faGear}/>
        </div>
    );
    }
export default TopBar;