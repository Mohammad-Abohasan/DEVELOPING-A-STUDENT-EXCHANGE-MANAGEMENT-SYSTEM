import { Routes, Route } from 'react-router-dom';
import Cookies from "universal-cookie";
import { useContext, useEffect } from "react";
import Login from "./login/Login";
import Home from './student/pages/Home';
import UnivRep from './univRepresentative/pages/UnivRep';
import Protect from './protected/Protect';
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
          <Route path="/universityRepresentative/*" element={<UnivRep />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
