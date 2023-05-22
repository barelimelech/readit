import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  StyledEngineProvider,
} from "@mui/material";

import classes from "./Header.module.css";

import Login from "./Login";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleCloseNavMenu = () => {};
  console.log("is logged in  " + isLoggedIn);

  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.icon_btn}
              //   size="large"
              //   edge="start"
              //   color="inherit"
                 aria-label="menu"
              //   sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              style={{ textTransform: "none" }}
            >
              <Grid item>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  readit
                </Typography>
              </Grid>
            </Button>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              readit
            </Typography> */}
            <MenuItem key={"tmp"} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">tmp</Typography>
            </MenuItem>
            {!isLoggedIn && (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            {isLoggedIn && <Button color="inherit">Profile</Button>}
          </Toolbar>
        </AppBar>
      </Box>
    </StyledEngineProvider>
  );
};

export default Header;
