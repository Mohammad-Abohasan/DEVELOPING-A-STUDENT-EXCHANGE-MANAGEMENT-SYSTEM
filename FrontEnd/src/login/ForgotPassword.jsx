import { useContext, useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { Link, Navigate } from "react-router-dom";
import {
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@mui/joy";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../api/axios";
import { AccessTokenContext } from "../context/AccessTokenProvider";
import './Login.css';
import headerLogTop from '../images/headerLogTop.png';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      sx={{ margin: 1 }}
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

const ForgotPassword = () => {
  const [data, setData] = useState({});
  const [usernameError, setUsernameError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { accessToken } = useContext(AccessTokenContext);
  const [mounted, setMounted] = useState(false);
  const [captchaResponse, setCaptchaResponse] = useState("");

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        ...data,
        "recaptchaResponse": captchaResponse,
      };
      await axios.post('/user/forgotPassword',
        JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUsernameError(false);
      await Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        title: 'Password reset link has been sent to your email!',
        icon: 'success'
      }).then(() => {
        setIsDone(true);
      });
    } catch (error) {
      if (error.response.status === 401) {
        setUsernameError(true);
      } else {
        console.error(error);
      }
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
      {accessToken || isDone ? (
        <Navigate to={'/'} />
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
                  placeholder="m.s.abuhasan"
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              {usernameError && (
                <p className="inputError">Incorrect username</p>
              )}
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                onChange={(response) => setCaptchaResponse(response)}
              />
              <Button style={{ backgroundColor: "#764abc", color: "white" }} onClick={onSubmit}>
                Send reset code
              </Button>
            </Sheet>
          </main>
        </CssVarsProvider>
      )}
    </>
  );
};

export default ForgotPassword;
