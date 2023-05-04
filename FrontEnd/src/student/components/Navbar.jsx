import { Link } from 'react-router-dom';
import logo from '../../AArU.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm mb-2 bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/">
          <img src={logo} alt='AArU' />
          <h4 className='logo-text'>Student Exchange Management System</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"}>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;