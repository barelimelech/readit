import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import classes from "./EditProfile.module.css";

// Contexts
import StateContext from "../../contexts/StateContext";
import GlobalContext from "../../contexts/GlobalContext";
// MUI
import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Box,
  StyledEngineProvider,
} from "@mui/material";

const EditProfile = (props) => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const address = useContext(GlobalContext);

  
  const initialState = {
    first_name: props.userProfile.first_name,
    last_name: props.userProfile.last_name,
    username: props.userProfile.username,
    email: props.userProfile.email,
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchFirstNameChange":
        draft.first_name = action.firstNameChosen;
        // GlobalState.userFirstName = action.firstNameChosen;
        break;
      case "catchLastNameChange":
        draft.last_name = action.lastNameChosen;
        break;
      case "catchUsernameChange":
        draft.username = action.usernameChosen;
        break;

      case "catchEmailChange":
        draft.email = action.emailChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
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
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProfile() {
        const formData = new FormData();
        formData.append("first_name", state.first_name);
        formData.append("last_name", state.last_name);
        formData.append("username", state.username);
        formData.append("email", state.email);

        try {
          const response = await Axios.patch(
            `http://${address.localhostIP}/api/users/${GlobalState.userId}/update/`,
            formData
          );
          GlobalState.userFirstName = state.first_name;
          GlobalState.userLastName = state.last_name;
          GlobalState.userUsername = state.username;
          GlobalState.userEmail = state.email;
          props.handleSave(response.data); // Invoke the handleSave function


          dispatch({ type: "openTheSnack" });
        } catch (e) {
          dispatch({ type: "allowTheButton" });
        }
      }
      UpdateProfile();
    }
  }, [state.sendRequest]);

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(0);
      }, 1500);
    }
  }, [state.openSnack]);

  function FormSubmit(e) {
    e.preventDefault();
    dispatch({ type: "changeSendRequest" });
    dispatch({ type: "disableTheButton" });
  }
  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={FormSubmit}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.root}
          sx={{ marginTop: "5rem" }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              gutterBottom
            >
              Edit Profile
            </Typography>
            <Box sx={{ p: { xs: 1, md: 3 }, boxShadow: 14 }}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                value={state.first_name}
                onChange={(e) =>
                  dispatch({
                    type: "catchFirstNameChange",
                    firstNameChosen: e.target.value,
                  })
                }
                InputProps={{
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={state.last_name}
                onChange={(e) =>
                  dispatch({
                    type: "catchLastNameChange",
                    lastNameChosen: e.target.value,
                  })
                }
                InputProps={{
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={state.disabledBtn}
                color="primary"
                sx={{
                  color: "white",
                  fontSize: "1.1rem",
                }}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={state.openSnack}
        message="You have successfully updated your profile!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </StyledEngineProvider>
  );
};

export default EditProfile;
