import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import Axios from "axios";

//Contexts
import DispatchContext from "../../contexts/DispatchContext";
import StateContext from "../../contexts/StateContext";

import {
  Grid,
  Typography,
  Button,
  TextField,
  StyledEngineProvider,
} from "@mui/material";

import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const GlobalDispatch = useContext(DispatchContext);

  const initialState = {
    usernameValue: "",
    passwordValue: "",
    sendRequestToSignup: 0,
    token: "",
    // openSnack: false,
    // disabledBtn: false,
    // serverError: false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        break;
      case "changeSendRequest":
        draft.sendRequestToSignup = draft.sendRequestToSignup + 1;
        break;
      case "catchToken":
        draft.token = action.tokenValue;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");
    dispatch({ type: "changeSendRequest" });
  };

  useEffect(() => {
    if (state.sendRequestToSignup) {
      const source = Axios.CancelToken.source();

      async function signin() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          // navigate('/');
          dispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          });
          GlobalDispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          });
        } catch (error) {
          console.log(error);
        }
      }
      signin();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequestToSignup]);

  //get user info
  useEffect(() => {
    if (state.token !== "") {
      const source = Axios.CancelToken.source();

      async function getUserInfo() {
        try {
          const response = await Axios.get(
            "http://localhost:8000/api-auth-djoser/users/me/",
            {
              headers: { Authorization: "Token ".concat(state.token) },
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          GlobalDispatch({
            type: "userSignsIn",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            IdInfo: response.data.id,
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
      getUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [state.token]);

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={handleFormSubmit}>
        <Grid
          item
          container
          justifyContent="center"
          style={{
            marginTop: "2rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h5">Login</Typography>
        </Grid>
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-name-input"
          label="Username"
          type="username"
          autoComplete="current-username"
          value={state.usernameValue}
          onChange={(e) =>
            dispatch({
              type: "catchUsernameChange",
              usernameChosen: e.target.value,
            })
          }
        />

        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={state.passwordValue}
          onChange={(e) =>
            dispatch({
              type: "catchPasswordChange",
              passwordChosen: e.target.value,
            })
          }
        />

        <Grid
          item
          container
          xs={1}
          style={{ marginTop: "auto", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            type="submit"
            style={{
              color: "white",
              fontSize: "1.1rem",
              marginLeft: "1rem",
              // "&:hover": {
              // 	backgroundColor: "blue",
              // },
            }}
            // disabled={state.disabledBtn}
          >
            Submit
          </Button>
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          style={{ marginTop: "1rem" }}
        >
          <Typography variant="small">
            Don't have an account yet?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              SIGN UP
            </span>
          </Typography>
        </Grid>
      </form>
    </StyledEngineProvider>
  );
};

export default Login;
