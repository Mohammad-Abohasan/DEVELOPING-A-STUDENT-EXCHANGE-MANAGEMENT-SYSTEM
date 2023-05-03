import Login from "./login/Login";
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './student/pages/Home';
import Navbar from './student/components/Navbar';
import Requests from './student/components/Requests';
import Protect from './features/Protect';
import './App.css';
import Offers from "./student/components/Offers";
import OfferDetails from "./student/components/OfferDetails";

function App() {
  return (
    <div className="App">
      <div className='row'>
        <Routes>
          <Route path="" element={<Login />} />
          <Route element={<Protect />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
