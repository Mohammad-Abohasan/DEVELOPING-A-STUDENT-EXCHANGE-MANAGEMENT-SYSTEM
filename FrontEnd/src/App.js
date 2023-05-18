import Login from "./login/Login";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './student/pages/Home';
import Protect from './protected/Protect';
import './App.css';
import AccessTokenProvider, { AccessTokenContext } from "./context/AccessTokenProvider";
import { useContext } from "react";

function App() {
  const { accessToken } = useContext(AccessTokenContext);

  return (
    <div className="App">
      <Routes>
        <Route path="" element={ <Login />} />
        <Route element={<Protect />} >
          <Route path="/home/*" element={<Home />} />
          <Route path="*" element={<h1>404 Page not found :)</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
