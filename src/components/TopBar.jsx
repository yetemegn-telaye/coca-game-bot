import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const TopBar = ({title}) => {  
    return (
        <div className="top-bar font-white">
        <FontAwesomeIcon icon={faCoffee} />
        <p>{title}</p>
        </div>
    );
    }
export default TopBar;