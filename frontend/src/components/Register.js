import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Box,
  StyledEngineProvider,
} from "@mui/material";

import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => {};
  return (
    <StyledEngineProvider injectFirst>
      <form onSubmit={handleFormSubmit}>
        <Grid
          item
          container
          justifyContent="center"
          style={{
            marginTop: "2rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h5">Register</Typography>
        </Grid>
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-name-input"
          label="Username"
          type="username"
          autoComplete="current-email"
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          className={classes.textfield}
          required
          fullWidth
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
        <Grid
          item
          container
          xs={1}
          style={{ marginTop: "auto", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            type="submit"
            style={{
              color: "white",
              fontSize: "1.1rem",
              marginLeft: "1rem",
              // "&:hover": {
              // 	backgroundColor: "blue",
              // },
            }}
            // disabled={state.disabledBtn}
          >
            Submit
          </Button>
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          style={{ marginTop: "1rem" }}
        >
          <Typography variant="small">
            Have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login
            </span>
          </Typography>
        </Grid>
      </form>
    </StyledEngineProvider>
  );
};

export default Register;
