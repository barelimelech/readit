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

const WaitingList = () => {
  const navigate = useNavigate();
  const address = useContext(GlobalContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitClicked(true);
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
            `http://${address.localhostIP}/api/waitinglist/create/`,
            formData
          );
          console.log("response " + response);
          if (response.status === 201) {
            setIsCreated(true);
            setFirstName("");
            setEmail("");
            setLastName("");
            // navigate('/');
          }
        } catch (e) {
          console.log("error waiting list :" + e);
        }
      }
      addUserToWaitingList();
    }
  }, [submitClicked]);
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom>
          Waiting List{" "}
        </Typography>
        <Box sx={{ mx: "auto", maxWidth: "400px" }}>
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
      </form>
      <div >
        {isCreated && (
          <Alert
            severity="success"
            style={{
              width: "25%",
              justifyContent: "center",
                display:"inline-flex",
                marginTop:"30px"
            }}
          >
            <AlertTitle>Success</AlertTitle>
            You successfuly added to <strong>WAITING LIST!</strong>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default WaitingList;
