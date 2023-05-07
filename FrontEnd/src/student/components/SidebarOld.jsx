import { Link } from 'react-router-dom';
import './Sidebar.css';
import WidgetsIcon from '@mui/icons-material/Widgets';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

function Sidebar() {
    return (
        <>
            <ul className="sidebar sidebar-mystyle" >
                <li>
                    <WidgetsIcon />
                    <Link to="/offers">Available Offers</Link>
                </li>
                <li>
                    <TrackChangesIcon />
                    <Link to="/requests">Follow-up Requests</Link>
                </li>
            </ul>
        </>
    );
}

export default Sidebar;