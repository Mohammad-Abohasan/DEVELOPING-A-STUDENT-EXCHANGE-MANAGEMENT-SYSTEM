import { useContext, useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { Link, Navigate } from "react-router-dom";
import {
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Button,
  autocompleteClasses,
} from "@mui/joy";
import axios from "../api/axios";
import { AccessTokenContext } from "../context/AccessTokenProvider";
import './Login.css';
import Cookies from "universal-cookie";
import headerLogTop from '../headerLogTop.png';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

const Login = () => {
  const [data, setData] = useState({});
  const [loginError, setLoginError] = useState(false);
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [mounted, setMounted] = useState(false)
  const cookie = new Cookies();

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/auth/login',
        JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(response);
      cookie.set('Bearer', response.data.accessToken);
      const tokenCookie = cookie.get('Bearer');
      setAccessToken(tokenCookie);
    } catch (error) {
      if (error.response.status === 401)
        setLoginError(true);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }

  return (
    <>
      {accessToken ? (
        <Navigate to="/home/dashboard" />
      ) : (
        <CssVarsProvider>
          <main>
            <ModeToggle />
            <Sheet
              sx={{
                width: 550,
                mx: "auto",
                my: 20,
                py: 3,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
              variant="outlined"
            >
              <Link to="/">
                <img src={headerLogTop} alt="headerTop-Logo" style={{ width: "100%" }} />
              </Link>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="abohasan@gmail.com"
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              {loginError && (
                <p className="loginError">Incorrect username or password</p>
              )}
              <Button style={{ backgroundColor: "#764abc", color: "white" }} onClick={onSubmit}>
                Log in
              </Button>
            </Sheet>
          </main>
        </CssVarsProvider>
      )}
    </>
  );
};

export default Login;
