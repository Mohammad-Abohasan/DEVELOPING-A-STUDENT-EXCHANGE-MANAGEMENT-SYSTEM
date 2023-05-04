import { Link } from 'react-router-dom';
import './Sidebar.css';
import 'material-icons/iconfont/material-icons.css';


function Sidebar() {
    return (
        <>
            <ul className="sidebar">
                <li>
                    <i className="material-icons">widgets</i>
                    <Link to="/offers">Available Offers</Link>
                </li>
                <li>
                    <i className="material-icons">track_changes</i>
                    <Link to="/requests">Follow-up Requests</Link>
                </li>
            </ul>
        </>
    );
}

export default Sidebar;