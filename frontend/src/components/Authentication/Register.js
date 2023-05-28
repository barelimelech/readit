import React, {useEffect, useState} from "react";
import {  useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useImmerReducer } from "use-immer";


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
  // const [sendRequestToSignup, setSendRequestToSignup] = useState(false);

  const initialState = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequestToSignup: 0,
    // sendRequest: 0,
    // openSnack: false,
    // disabledBtn: false,
    // usernameErrors: {
    //   hasErrors: false,
    //   errorMessage: "",
    // },
    // emailErrors: {
    //   hasErrors: false,
    //   errorMessage: "",
    // },
    // passwordErrors: {
    //   hasErrors: false,
    //   errorMessage: "",
    // },
    // password2HelperText: "",
    // serverMessageUsername: "",
    // serverMessageEmail: "",
    // serverMessageSimilarPassword: "",
    // serverMessageCommonPassword: "",
    // serverMessageNumericPassword: "",
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
       
        break;
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
       
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
      
        break;
      case "catchPassword2Change":
        draft.password2Value = action.password2Chosen;
      
        break;
      case "changeSendRequest":
        draft.sendRequestToSignup = draft.sendRequestToSignup + 1;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);


  const handleFormSubmit = (e) => {
		e.preventDefault();
    console.log("form submit");
    dispatch({type: "changeSendRequest"});
  };

  useEffect(() => {
    if(state.sendRequestToSignup){
    const source = Axios.CancelToken.source();

    async function SignUp() {
    
      try {
        const response = await Axios.post(
          "http://localhost:8000/api-auth-djoser/users/",
          {
            username: state.usernameValue,
            email:state.emailValue,
            password: state.passwordValue,
            re_password: state.password2Value,
          },
          {
            cancelToken: source.token,
          }
        );
        console.log(response);
        navigate('/');
      }
      catch(error){
        console.log(error)
      }
    }
    SignUp();
    return()=>{
      source.cancel();
    };
  }},[state.sendRequestToSignup]);
    
		// if (state.sendRequest) {
			// const source = Axios.CancelToken.source();
			// async function SignUp() {
			// 	try {
			// 		const response = await Axios.post(
			// 			"http://localhost:8000/api-auth-djoser/users/",
			// 			{
			// 				username: state.usernameValue,
			// 				email: state.emailValue,
			// 				password: state.passwordValue,
			// 				re_password: state.password2Value,
			// 			},
			// 			{
			// 				cancelToken: source.token,
			// 			}
			// 		);

			// 		dispatch({ type: "openTheSnack" });
			// 	} catch (error) {
			// 		dispatch({ type: "allowTheButton" });

			// 		if (error.response.data.username) {
      //       console.log(error.response.data.username);
			// 			dispatch({ type: "usernameExists" });
			// 		} else if (error.response.data.email) {
			// 			dispatch({ type: "emailExists" });
			// 		} else if (
			// 			error.response.data.password[0] ===
			// 			"The password is too similar to the username."
			// 		) {
			// 			dispatch({ type: "similarPassword" });
			// 		} else if (
			// 			error.response.data.password[0] === "This password is too common."
			// 		) {
			// 			dispatch({ type: "commonPassword" });
			// 		} else if (
			// 			error.response.data.password[0] ===
			// 			"This password is entirely numeric."
			// 		) {
			// 			dispatch({ type: "numericPassword" });
			// 		}
			// 	}
			// }
			// SignUp();
			// return () => {
			// 	source.cancel();
			// };
		// }
	 
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
          <Typography variant="h5">Register</Typography>
        </Grid>
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-name-input"
          label="Username"
          type="username"
          autoComplete="current-email"
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
            Have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login
            </span>
          </Typography>
        </Grid>
      </form>
    </StyledEngineProvider>
  );
};

export default Register;
