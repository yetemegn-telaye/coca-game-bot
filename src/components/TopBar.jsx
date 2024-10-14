import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faGear} from '@fortawesome/free-solid-svg-icons';

const TopBar = ({title}) => {  
    return (
        <div className="flex justify-between px-5 py-4">
            <div className='flex'>
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>{title}</p>
            </div>
            <FontAwesomeIcon icon={faGear}/>
        </div>
    );
    }
export default TopBar;