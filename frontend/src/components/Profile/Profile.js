import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

//style
import classes from "./Profile.module.css";

//components
import StateContext from "../../contexts/StateContext";
import ProfileUpdate from "./EditProfile";

// MUI
import {
  Box,
  Button,
  Grid,
  Typography,
  StyledEngineProvider,
  Paper,
} from "@mui/material";
import EditProfile from "./EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const [isEditing, setIsEditing] = useState(false);

  const initialState = {
    userProfile: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
    },
    dataIsLoading: true,
  };

  const handleSave = () => {
    // Perform save/update operation here, e.g., make an API call
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
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/users/${GlobalState.userId}/`
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
    <StyledEngineProvider injectFirst>
      {isEditing === false ? (
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.profile_headline}>
              <Box sx={{ p: 10, width: 900, boxShadow: 14 }}>
                <h1> Hello</h1>
                <br />
                username:
                <Paper className={classes.profile_span}>
                   {GlobalState.userUsername}
                </Paper>
                <br />
                first name:
                <Paper className={classes.profile_span}>
                   {GlobalState.userFirstName}
                </Paper>
                <br />
                last name:
                <Paper className={classes.profile_span}>
                  {GlobalState.userLastName}
                </Paper>
                <br />
                email:
                <Paper className={classes.profile_span}>
                   {GlobalState.userEmail}
                </Paper>
                <Grid>
                  <Button size="large" onClick={handelUpdateProfile}>Edit profile</Button>
                </Grid>
              </Box>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <EditProfile userProfile={state.userProfile}></EditProfile>
      )}
    </StyledEngineProvider>
  );
};

export default Profile;
