import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import GlobalContext from "../../contexts/GlobalContext";

import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
  StyledEngineProvider,
} from "@mui/material";

import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);

  const initialState = {
    firstNameValue: "",
    lastNameValue: "",
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequestToSignup: 0,
    openSnack: false,
    disabledBtn: false,
    usernameErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    emailErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    passwordErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    password2HelperText: "",
    serverMessageUsername: "",
    serverMessageEmail: "",
    serverMessageSimilarPassword: "",
    serverMessageCommonPassword: "",
    serverMessageNumericPassword: "",
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchFirstNameChange":
        draft.firstNameValue = action.firstNameChosen;
        // draft.firstNameErrors.hasErrors = false;
        // draft.firstNameErrors.errorMessage = "";
        // draft.serverMessageFirstName = "";
        break;
      case "catchLastNameChange":
        draft.lastNameValue = action.lastNameChosen;
        // draft.lastNameErrors.hasErrors = false;
        // draft.lastNameErrors.errorMessage = "";
        // draft.serverMessageLastName = "";
        break;
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        draft.usernameErrors.hasErrors = false;
        draft.usernameErrors.errorMessage = "";
        draft.serverMessageUsername = "";
        break;
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        draft.emailErrors.hasErrors = false;
        draft.emailErrors.errorMessage = "";
        draft.serverMessageEmail = "";
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        draft.passwordErrors.hasErrors = false;
        draft.passwordErrors.errorMessage = "";
        draft.serverMessageSimilarPassword = "";
        draft.serverMessageCommonPassword = "";
        draft.serverMessageNumericPassword = "";
        break;
      case "catchPassword2Change":
        draft.password2Value = action.password2Chosen;
        if (action.password2Chosen !== draft.passwordValue) {
          draft.password2HelperText = "The passwords must match";
        } else if (action.password2Chosen === draft.passwordValue) {
          draft.password2HelperText = "";
        }
        break;
      case "changeSendRequest":
        draft.sendRequestToSignup = draft.sendRequestToSignup + 1;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;

      case "disableTheButton":
        draft.disabledBtn = true;
        break;

      case "allowTheButton":
        draft.disabledBtn = false;
        break;

      case "catchUsernameErrors":
        if (action.usernameChosen.length === 0) {
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage = "This field must not be empty";
        } else if (action.usernameChosen.length < 3) {
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage =
            "The username must have at least five characters";
        } else if (!/^([a-zA-Z0-9]+)$/.test(action.usernameChosen)) {
          draft.usernameErrors.hasErrors = true;
          draft.usernameErrors.errorMessage =
            "This field must not have special characters";
        }
        break;

      case "catchEmailErrors":
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            action.emailChosen
          )
        ) {
          draft.emailErrors.hasErrors = true;
          draft.emailErrors.errorMessage = "Please enter a valid email!";
        }
        break;

      case "catchPasswordErrors":
        if (action.passwordChosen.length < 8) {
          draft.passwordErrors.hasErrors = true;
          draft.passwordErrors.errorMessage =
            "The password must at least have 8 characters!";
        }
        break;

      case "usernameExists":
        draft.serverMessageUsername = "This username already exists!";
        break;

      case "emailExists":
        draft.serverMessageEmail = "This email already exists!";
        break;

      case "similarPassword":
        draft.serverMessageSimilarPassword =
          "The password is too similar to the username!";
        break;

      case "commonPassword":
        draft.serverMessageCommonPassword = "The password is too common!";
        break;

      case "numericPassword":
        draft.serverMessageNumericPassword =
          "The password must not only contain numbers!";
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");
    if (
      !state.usernameErrors.hasErrors &&
      !state.emailErrors.hasErrors &&
      !state.passwordErrors.hasErrors &&
      state.password2HelperText === ""
    ) {
      dispatch({ type: "changeSendRequest" });
      dispatch({ type: "disableTheButton" });
    }
  };

  useEffect(() => {
    if (state.sendRequestToSignup) {
      const source = Axios.CancelToken.source();
      console.log("1state.firstNameValue " + state.firstNameValue);
      console.log("1state.lastNameValue " + state.lastNameValue);
      async function signup() {
        console.log("state.firstNameValue " + state.firstNameValue);
        console.log("state.lastNameValue " + state.lastNameValue);
        try {
          const response = await Axios.post(
            `${address.localhostIP}/api-auth-djoser/users/`,
            {
              username: state.usernameValue,
              first_name: state.firstNameValue,
              last_name: state.lastNameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.password2Value,
            },
            {
              cancelToken: source.token,
            }
          );
          dispatch({ type: "openTheSnack" });
        } catch (error) {
          dispatch({ type: "allowTheButton" });
          if (error.response.data.username) {
            console.log(error.response.data.username);
            dispatch({ type: "usernameExists" });
          } else if (error.response.data.email) {
            dispatch({ type: "emailExists" });
          } else if (
            error.response.data.password[0] ===
            "The password is too similar to the username."
          ) {
            dispatch({ type: "similarPassword" });
          } else if (
            error.response.data.password[0] === "This password is too common."
          ) {
            dispatch({ type: "commonPassword" });
          } else if (
            error.response.data.password[0] ===
            "This password is entirely numeric."
          ) {
            dispatch({ type: "numericPassword" });
          }
        }
      }
      signup();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequestToSignup]);

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [state.openSnack]);

  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={handleFormSubmit}>
        <Grid
          item
          container
          justifyContent="center"
          style={{
            marginTop: "7rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h5">Register</Typography>
        </Grid>
        <Box sx={{ mx: "auto", maxWidth: "400px", px: "16px" }}>

        {state.serverMessageUsername ? (
          <Alert severity="error">{state.serverMessageUsername}</Alert>
        ) : (
          ""
        )}

        {state.serverMessageEmail ? (
          <Alert severity="error">{state.serverMessageEmail}</Alert>
        ) : (
          ""
        )}

        {state.serverMessageSimilarPassword ? (
          <Alert severity="error">{state.serverMessageSimilarPassword}</Alert>
        ) : (
          ""
        )}

        {state.serverMessageCommonPassword ? (
          <Alert severity="error">{state.serverMessageCommonPassword}</Alert>
        ) : (
          ""
        )}

        {state.serverMessageNumericPassword ? (
          <Alert severity="error">{state.serverMessageNumericPassword}</Alert>
        ) : (
          ""
        )}

        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-firstname-input"
          label="First Name"
          type="firstName"
          autoComplete="current-firstName"
          value={state.firstNameValue}
          onChange={(e) =>
            dispatch({
              type: "catchFirstNameChange",
              firstNameChosen: e.target.value,
            })
          }
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-lastname-input"
          label="Last Name"
          type="lastName"
          autoComplete="current-lastName"
          value={state.lastNameValue}
          onChange={(e) =>
            dispatch({
              type: "catchLastNameChange",
              lastNameChosen: e.target.value,
            })
          }
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-username-input"
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
          onBlur={(e) =>
            dispatch({
              type: "catchUsernameErrors",
              usernameChosen: e.target.value,
            })
          }
          error={state.usernameErrors.hasErrors ? true : false}
          helperText={state.usernameErrors.errorMessage}
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          value={state.emailValue}
          onChange={(e) =>
            dispatch({
              type: "catchEmailChange",
              emailChosen: e.target.value,
            })
          }
          onBlur={(e) =>
            dispatch({
              type: "catchEmailErrors",
              emailChosen: e.target.value,
            })
          }
          error={state.emailErrors.hasErrors ? true : false}
          helperText={state.emailErrors.errorMessage}
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
          onBlur={(e) =>
            dispatch({
              type: "catchPasswordErrors",
              passwordChosen: e.target.value,
            })
          }
          error={state.passwordErrors.hasErrors ? true : false}
          helperText={state.passwordErrors.errorMessage}
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          value={state.password2Value}
          onChange={(e) =>
            dispatch({
              type: "catchPassword2Change",
              password2Chosen: e.target.value,
            })
          }
          helperText={state.password2HelperText}
        />
        </Box>
        <Grid
          item
          container
          xs={12}
          justifyContent="center" // Add this line to center the content horizontally
          alignItems="center"
          style={{ marginTop: "auto", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            type="submit"
            style={{
              color: "white",
              fontSize: "1rem",
              // "&:hover": {
              // 	backgroundColor: "blue",
              // },
            }}
            disabled={state.disabledBtn}
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
            Have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login
            </Button>
          </Typography>
        </Grid>
      </form>
      <Snackbar
        open={state.openSnack}
        message="You have successfully created an account!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </StyledEngineProvider>
  );
};

export default Register;
