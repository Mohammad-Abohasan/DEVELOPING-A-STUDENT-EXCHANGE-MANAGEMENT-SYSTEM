import Login from "./login/Login";
import { Routes, Route } from 'react-router-dom';
import Home from './student/pages/Home';
import Protect from './protected/Protect';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route element={<Protect />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<h1>404 Page not found :)</h1>} />
      </Routes>
    </div>
  );
}

export default App;
