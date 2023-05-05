import { useEffect, useState } from "react";
import "./Login.css";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { Navigate } from "react-router-dom";
import {
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";

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
  const [isLogged, setIsLogged] = useState(false);

  const handleInputChange = (event) => {
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
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="abohasan@email.com"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleInputChange}
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
