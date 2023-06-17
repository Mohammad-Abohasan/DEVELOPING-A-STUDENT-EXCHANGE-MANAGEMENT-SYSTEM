import { useContext, useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@mui/joy";
import Swal from "sweetalert2";
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

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [data, setData] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const { accessToken } = useContext(AccessTokenContext);
  const [mounted, setMounted] = useState(false);

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/user/resetPassword/${resetToken}`,
        JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPasswordError(false);
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        title: 'Password changed successfully!',
        icon: 'success'
      }).then(() => {
        setIsDone(true);
      });
    } catch (error) {
      if (error.response.status === 401) {
        setPasswordError(true);
      } else if (error.response.status === 403) {
        setIsValidToken(false);
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
                <FormLabel>New password</FormLabel>
                <Input
                  name="newPassword"
                  type="password"
                  placeholder="new password"
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              {!isValidToken && (
                <p className="inputError">Token not valid</p>
              )}
              {passwordError && (
                <p className="inputError">Please confirm new password</p>
              )}
              <Button style={{ backgroundColor: "#764abc", color: "white" }} onClick={onSubmit}>
                Reset password
              </Button>
            </Sheet>
          </main>
        </CssVarsProvider>
      )}
    </>
  );
};

export default ResetPassword;
