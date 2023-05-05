import Login from "./login/Login";
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './student/pages/Home';
import Protect from './features/Protect';
import './App.css';
import Offers from "./student/components/Offers";
import OfferDetails from "./student/components/OfferDetails";
import Requests from "./student/components/Requests";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route element={<Protect />} />
        <Route path="home" element={<Home />} />
        <Route path="/offers" element={<Outlet />}>
          <Route path="" element={<Offers />} />
          <Route path=":offerID" element={<OfferDetails />} />
        </Route>
        <Route path="/requests" element={<Requests />} />
        <Route path="*" element={<h1>404 Page not found :)</h1>} />
      </Routes>
    </div>
  );
}

export default App;
