import Login from "./login/Login";
import { Routes, Route } from 'react-router-dom';
import Home from './student/pages/Home';
import Protect from './protected/Protect';
import './App.css';
import AccessTokenProvider from "./context/AccessTokenProvider";

function App() {
  return (
    <div className="App">
      <AccessTokenProvider>
        <Routes>
          <Route path="" element={<Login />} />
          <Route element={<Protect />} >
            <Route path="/home/*" element={<Home />} />
            <Route path="*" element={<h1>404 Page not found :)</h1>} />
          </Route>
        </Routes>
      </AccessTokenProvider>
    </div>
  );
}

export default App;
