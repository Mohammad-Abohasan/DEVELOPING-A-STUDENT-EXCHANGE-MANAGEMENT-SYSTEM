import { Routes, Route } from 'react-router-dom';
import Cookies from "universal-cookie";
import { useContext, useEffect } from "react";
import Login from "./student/pages/login/Login";
import Home from './student/pages/Home';
import Protect from './student/pages/protected/Protect';
import { AccessTokenContext } from "./context/AccessTokenProvider";
import PageNotFound from "./student/pages/PageNotFound";
import './App.css';

function App() {
  const { setAccessToken } = useContext(AccessTokenContext);
  const cookie = new Cookies();

  useEffect(() => {
    const getToken = cookie.get('Bearer');
    setAccessToken(getToken);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route element={<Protect />} >
          <Route path="/home/*" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
