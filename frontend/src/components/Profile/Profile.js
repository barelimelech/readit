import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

//style
import classes from "./Profile.module.css";

//components
import StateContext from "../../contexts/StateContext";
import ProfileUpdate from "./EditProfile";
import GlobalContext from "../../contexts/GlobalContext";

// MUI
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import EditProfile from "./EditProfile";
import { alpha } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Profile = () => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const [isEditing, setIsEditing] = useState(false);
  const address = useContext(GlobalContext);
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});
  const initialState = {
    userProfile: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
    },
    dataIsLoading: true,
  };

  const handleSave = (updatedProfile) => {
    dispatch({
      type: "catchUserProfileInfo",
      profileObject: updatedProfile,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.first_name = action.profileObject.first_name;
        draft.userProfile.last_name = action.profileObject.last_name;
        draft.userProfile.username = action.profileObject.username;
        draft.userProfile.email = action.profileObject.email;
        return;

      case "loadingDone":
        draft.dataIsLoading = false;
        return;

      default:
        return draft;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `${address.localhostIP}/api/users/${GlobalState.userId}/`
        );

        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
        dispatch({ type: "loadingDone" });
      } catch (e) {}
    }
    GetProfileInfo();
  }, []);

  const handelUpdateProfile = () => {
    setIsEditing(true);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
       {state.dataIsLoading ? ( // Render the spinner while data is loading
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={15}
        >
          <CircularProgress /> {/* Display the CircularProgress component */}
        </Grid>
      ) :
      isEditing === false ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={15}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              align="center"
              color="primary"
              sx={{ flexGrow: 1, fontFamily: "Lobster Two, cursive" }}
              // className={classes.profileHeadline}
            >
              Hello {state.userProfile.username}
            </Typography>

            <Box
              className={classes.profileDetails}
              marginTop={5}
              sx={{ p: { xs: 1, md: 3 }, boxShadow: 14 }}
            >
              <Paper
                className={classes.profileSpan}
                sx={{
                  backgroundColor: alpha("#fff", 0.8),
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Username:
                </Typography>
                <Typography variant="body1">
                  {state.userProfile.username}
                </Typography>
              </Paper>
              <Paper
                className={classes.profileSpan}
                sx={{
                  backgroundColor: alpha("#fff", 0.8),
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  First Name:
                </Typography>
                <Typography variant="body1">
                  {state.userProfile.first_name}
                </Typography>
              </Paper>
              <Paper
                className={classes.profileSpan}
                sx={{
                  backgroundColor: alpha("#fff", 0.8),
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Last Name:
                </Typography>
                <Typography variant="body1">
                  {state.userProfile.last_name}
                </Typography>
              </Paper>
              <Paper
                className={classes.profileSpan}
                sx={{
                  backgroundColor: alpha("#fff", 0.8),
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Email:
                </Typography>
                <Typography variant="body1">
                  {state.userProfile.email}
                </Typography>
              </Paper>
              <Button
                variant="contained"
                size="large"
                onClick={handelUpdateProfile}
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <EditProfile userProfile={state.userProfile} handleSave={handleSave} />
      )}
    </Container>
  );
};

export default Profile;
