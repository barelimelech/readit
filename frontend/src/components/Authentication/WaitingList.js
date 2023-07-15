import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Axios from "axios";
import GlobalContext from "../../contexts/GlobalContext";
import Popup from "../Popup";

const WaitingList = () => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isAlreadyCreated, setIsAlreadyCreated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitClicked(true);
    setShowPopup(true);
    setIsAlreadyCreated(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setIsAlreadyCreated(false);

    navigate("/");
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (submitClicked) {
      async function addUserToWaitingList() {
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("timestamp", new Date().toISOString());

        try {
          const response = await Axios.post(
            `${address.localhostIP}/api/waitinglist/create/`,
            formData
          );
          console.log("response " + response);
          if (response.status === 201) {
            setShowPopup(true);
            setIsCreated(true);
            // setFirstName("");
            // setEmail("");
            // setLastName("");
            //navigate('/');
          }else if (response.status === 400) {
            setShowPopup(true);
            setIsAlreadyCreated(true);
            
          }
        } catch (e) {
          console.log("error waiting list :" + e);
        }
      }
      addUserToWaitingList();
    }
  }, [submitClicked]);
  return (
    <div style={{ marginTop: "100px" }}>
      <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Waiting List{" "}
        </Typography>
        <Box sx={{ mx: "auto", maxWidth: "400px", px: "16px" }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={handleGoBack} variant="outlined" color="primary">
          Go Back
        </Button>
      </form>
      <div>
        {isCreated && (
          <Popup
            title={"You successfuly added to WAITING LIST!"}
            context={""}
            open={showPopup}
            onClose={handleClosePopup}
          />
          // <Alert
          //   severity="success"
          //   style={{
          //     width: "25%",
          //     justifyContent: "center",
          //     display: "inline-flex",
          //     marginTop: "30px",
          //   }}
          // >
          //   <AlertTitle>Success</AlertTitle>
          //   You successfuly added to <strong>WAITING LIST!</strong>
          // </Alert>
        )}
        {isAlreadyCreated && (
          <Popup
            title={"You already added to WAITING LIST!"}
            context={""}
            open={showPopup}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default WaitingList;
