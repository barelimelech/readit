import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import GlobalContext from "../../contexts/GlobalContext";
import StateContext from "../../contexts/StateContext";
import { useParams } from "react-router-dom";

import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
  StyledEngineProvider,
  Chip,
} from "@mui/material";

import subjects from "../../subject.json";
import { useLocation } from "react-router-dom";

const Interests = () => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);
  const choices = subjects.subjects;
  const [selectedChoices, setSelectedChoices] = useState([]);
  const GlobalState = useContext(StateContext);
  const location = useLocation();
  const userId = location.state?.userId;

  const initialState = {
    interestsValue: "",
    sendRequestToSignup: 0,
    openSnack: false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchInterestsChange":
        draft.interestsValue = action.interestsChosen;
        break;
      case "changeSendRequest":
        draft.sendRequestToSignup = draft.sendRequestToSignup + 1;
        break;
      case "openTheSnack":
        draft.openSnack = true;
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");

    dispatch({ type: "changeSendRequest" });
    dispatch({ type: "disableTheButton" });
  };

  useEffect(() => {
    if (state.sendRequestToSignup) {
      const source = Axios.CancelToken.source();

      async function updateUser() {
        const userData = new FormData();

        userData.append("theUserInterests", choices);

        try {
          const response = await Axios.patch(
            `${address.localhostIP}/api/users/${userId}/update-field/`,
            {
              field_name: "interests",
              new_value: selectedChoices,
            }
            
          );
                    dispatch({ type: "openTheSnack" });

        } catch (error) {
          console.log("update user after interests " + error);
        }
      }
      updateUser();
    }
  }, [state.sendRequestToSignup]);

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [state.openSnack]);

  const handleChoiceClick = (choice) => {
    if (selectedChoices.includes(choice)) {
      setSelectedChoices(selectedChoices.filter((c) => c !== choice));
    } else {
      setSelectedChoices([...selectedChoices, choice]);
    }
  };
  return (
    <StyledEngineProvider injectFirst>
      <Box
        display="flex"
        justifyContent="center"
        gap={1}
        flexWrap="wrap"
        padding={20}
        onClick={(event) => handleChoiceClick(event.target.innerText)}
      >
        {choices.map((choice) => (
          <Chip
            key={choice}
            label={choice}
            variant={selectedChoices.includes(choice) ? "default" : "outlined"}
            sx={{
              fontSize: "16px",
              backgroundColor: selectedChoices.includes(choice)
                ? "#d68bd0"
                : "transparent",
              color: selectedChoices.includes(choice) ? "#ffffff" : undefined,
            }}
            value={state.interestsValue}
            onChange={(e) =>
              dispatch({
                type: "catchInterestsChange",
                interestsChosen: e.target.value,
              })
            }
          />
        ))}
      </Box>
      <Button onClick={handleFormSubmit}>Save</Button>

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

export default Interests;
