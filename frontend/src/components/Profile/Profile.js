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
} from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const [isEditing, setIsEditing] = useState(false);

  const initialState = {
    userProfile: {
      first_name: "",
      last_name: "",
      username: "",
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
        console.log(action.profileObject.first_name + " action.profileObject.first_name")
        console.log(draft.userProfile.first_name+ " draft.userProfile.first_name")
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
    navigate("/updateprofile");
  };

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.profile_details}>
            <Box
             sx={{ p:10, width: 900,  boxShadow: 14 }}
            >
              Hello{" "}
              <span className={classes.profile_span}>
                {GlobalState.userUsername}
                
              </span>
              <br/>
              <span className={classes.profile_span}>
                {GlobalState.userFirstName}
              </span>
              <br/>
              <span className={classes.profile_span}>
              {GlobalState.userLastName}
              </span>
              <Grid>
                <Button onClick={handelUpdateProfile}>Edit profile</Button>
              </Grid>
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </StyledEngineProvider>
  );
};

export default Profile;
