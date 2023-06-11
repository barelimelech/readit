import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import classes from "./EditProfile.module.css";

// Contexts
import StateContext from "../../contexts/StateContext";

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

const EditProfile = () => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    username: GlobalState.userUsername,
    email: GlobalState.userEmail,
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
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
        console.log("usernamse update" + state.username);

        formData.append("username", state.username);
        formData.append("email", state.email);
        //   formData.append("phone_number", state.phoneNumberValue);
        //   formData.append("bio", state.bioValue);
        //   formData.append("profile_picture", state.profilePictureValue);
        //   formData.append("seller", GlobalState.userId);

        try {
          const response = await Axios.patch(
            `http://localhost:8000/api/users/${GlobalState.userId}/update/`,
            formData
          );

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
                    id="username"
                    label="username*"
                    variant="outlined"
                    fullWidth
                    value={state.username}
                    onChange={(e) =>
                      dispatch({
                        type: "catchUsernameChange",
                        usernameChosen: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item container style={{ marginTop: "1rem" }}>
                  <TextField
                    id="email"
                    label="email*"
                    variant="outlined"
                    fullWidth
                    value={state.email}
                    onChange={(e) =>
                      dispatch({
                        type: "catchEmailChange",
                        emailChosen: e.target.value,
                      })
                    }
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
    // <>
    //  <div
    //     style={{
    //       width: "50%",
    //       marginLeft: "auto",
    //       marginRight: "auto",
    //       marginTop: "3rem",
    //       padding: "3rem",
    //     }}
    //   >
    //   <form onSubmit={FormSubmit}>

    //       <Grid item container justifyContent="center" style={{ marginTop: "4rem" }}>
    //         <Typography variant="h4">MY PROFILE</Typography>
    //       </Grid>

    //       <Grid item container style={{ marginTop: "1rem"}}>
    //         <TextField
    //           id="username"
    //           label="username*"
    //           variant="outlined"
    //           fullWidth
    //           value={state.username}
    //           onChange={(e) =>
    //             dispatch({
    //               type: "catchUsernameChange",
    //               usernameChosen: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid
    //         item
    //         container
    //         xs={3}
    //         style={{
    //           marginTop: "1rem",
    //           marginLeft: "auto",
    //           marginRight: "auto",
    //         }}
    //       >
    //         <Button
    //           variant="contained"
    //           fullWidth
    //           type="submit"
    //           style={{
    //             backgroundColor: "#0086b3",
    //             color: "white",
    //             fontSize: "1.1rem",
    //             marginLeft: "1rem",
    //           }}
    //           disabled={state.disabledBtn}
    //         >
    //           UPDATE PROFILE
    //         </Button>
    //       </Grid>
    //   </form>

    // <Snackbar
    //   open={state.openSnack}
    //   message="You have successfully updated your profile!"
    //   anchorOrigin={{
    //     vertical: "bottom",
    //     horizontal: "center",
    //   }}
    // />
    //   </div>
    // </>
  );
};

export default EditProfile;
