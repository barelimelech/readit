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
  StyledEngineProvider,
  Paper,
  Container,
} from "@mui/material";
import EditProfile from "./EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const [isEditing, setIsEditing] = useState(false);
  const address = useContext(GlobalContext);

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
        return; // Add a return statement here

      default:
        return draft; // Add a return statement here
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://${address.localhostIP}/api/users/${GlobalState.userId}/`
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
    // <ProfileUpdate userProfile={state.userProfile} />
    setIsEditing(true);
    // navigate("/updateprofile");
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      {isEditing === false ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={15}
      
        >
          <Grid item>
            <Typography
              variant="h4"
              align="center"
              className={classes.profileHeadline}
            >
              Hello {state.userProfile.username}
            </Typography>
            <Typography className={classes.profileDetails}>
              <Box component={Paper} className={classes.profileSpan}>
                Username: {state.userProfile.username}
              </Box>
              <Box component={Paper} className={classes.profileSpan}>
                First Name: {state.userProfile.first_name}
              </Box>
              <Box component={Paper} className={classes.profileSpan}>
                Last Name: {state.userProfile.last_name}
              </Box>
              <Box component={Paper} className={classes.profileSpan}>
                Email: {state.userProfile.email}
              </Box>
              <Button size="large" onClick={handelUpdateProfile}>
                Edit Profile
              </Button>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <EditProfile userProfile={state.userProfile} handleSave={handleSave} />
      )}
    </Container>
  );
};

export default Profile;
