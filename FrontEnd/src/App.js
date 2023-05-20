import Login from "./login/Login";
import { Routes, Route } from 'react-router-dom';
import Home from './student/pages/Home';
import Protect from './protected/Protect';
import './App.css';
import { useContext, useEffect } from "react";
import { AccessTokenContext } from "./context/AccessTokenProvider";
import Cookies from "universal-cookie";
import PageNotFound from "./student/components/PageNotFound";

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
