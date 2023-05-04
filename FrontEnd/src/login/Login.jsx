import React, { useState } from "react";
import "./Login.css";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import {
  Sheet,
  // Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";
import { Navigate } from "react-router-dom";
import Navbar from "../student/components/Navbar";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
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
  const [isLogged, setIsLogged] = useState(false);

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(data));
    setIsLogged(true);
  };

  return (
    <>
      {isLogged ? (
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
              {/* <div>
                <Typography level="h4" component="h1">
                  <b>Welcome!</b>
                </Typography>
                <Typography level="body2">Sign in to continue.</Typography>
              </div> */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="johndoe@email.com"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={onChange}
                />
              </FormControl>
              <Button sx={{ mt: 1 }} onClick={onSubmit}>
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
