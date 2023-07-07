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
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.edit_profile}>
              <Box sx={{ p: 10, width: 900, boxShadow: 14 }}>
                <Grid
                  item
                  container
                  justifyContent="center"
                  style={{ marginTop: "1rem" }}
                >
                  <Typography style={{ color: "#1d71cb" }} variant="h4">
                    Edit Profile
                  </Typography>
                </Grid>

                <Grid item container style={{ marginTop: "1rem" }}>
                  <TextField
                    id="firstName"
                    label="firstName"
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
                  />
                </Grid>

                <Grid item container style={{ marginTop: "1rem" }}>
                  <TextField
                    id="lastName"
                    label="lastName*"
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
                  />
                </Grid>

                <Grid
                  item
                  container
                  xs={3}
                  style={{
                    marginTop: "1rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    style={{
                      backgroundColor: "#1d71cb",
                      color: "white",
                      fontSize: "1.1rem",
                      marginLeft: "1rem",
                    }}
                    disabled={state.disabledBtn}
                  >
                    Save
                  </Button>
                </Grid>
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <div>
        <Snackbar
          open={state.openSnack}
          message="You have successfully updated your profile!"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        />
      </div>
    </StyledEngineProvider>
  );
};

export default EditProfile;
