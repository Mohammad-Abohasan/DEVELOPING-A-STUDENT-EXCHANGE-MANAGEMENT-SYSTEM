import { useContext, useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { Navigate } from "react-router-dom";
import {
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";
import axios from "../api/axios";
import { AccessTokenContext } from "../context/AccessTokenProvider";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

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
  // const [isLogged, setIsLogged] = useState(false);
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);

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
      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
      } else {
        console.error(`Failed to login: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to login: ${error}`);
    }
  };

  return (
    <>
      {accessToken !== '' ? (
        <Navigate to="/home" />
      ) : (
        <CssVarsProvider>
          <main>
            <ModeToggle />
            <Sheet
              sx={{
                width: 300,
                mx: "auto",
                my: 4,
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
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="abohasan@email.com"
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
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
                />
              </FormControl>
              <Button style={{ backgroundColor: "#764abc", color: "white" }} sx={{ mt: 1 }} onClick={onSubmit}>
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
