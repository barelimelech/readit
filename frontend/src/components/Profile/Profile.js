import React, { useEffect,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

//style
import classes from "./Profile.module.css";

//components
import StateContext from "../../contexts/StateContext";
import ProfileUpdate from "./ProfileUpdate";

// MUI
import { Button,Grid, Typography, StyledEngineProvider } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const [isEditing, setIsEditing] = useState(false);

  const initialState = {
    userProfile: {
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
        draft.userProfile.username = action.profileObject.username;
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

  const handelUpdateProfile = () =>{
    // <ProfileUpdate userProfile={state.userProfile} />
    setIsEditing(true);
    navigate('/updateprofile')
  };

  return (
    <StyledEngineProvider injectFirst>

    <Grid item container direction="column" justifyContent="center">
      <Grid item>
        <Typography className={classes.profile_details}>
          Hello{" "}
          <span className={classes.profile_span}>
            {GlobalState.userUsername}
          </span>
        </Typography>
      </Grid>
      {/* <Grid item>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          You have
        </Typography>
      </Grid> */}
    </Grid>

     {/* <ProfileUpdate userProfile={state.userProfile} /> */}

    <Grid>
      <Button onClick={handelUpdateProfile}>
        Update profile
      </Button>
    </Grid>
    </StyledEngineProvider>
  );
};

export default Profile;
