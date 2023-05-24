import { useState, MouseEvent, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

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
  Modal,
} from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import classes from "./Header.module.css";

import Login from "./Login";
import History from "./History";
import BurgerSidebarMenu from "./Menu/BurgerSidebarMenu";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // const handleOpenMenu = () => {
  //   // //setShowMenu(event.currentTarget);
  //   // setShowMenu(false);
  //   // // <History/>
  //   // navigate("/history");
  // };

  // const handleCloseMenu = () => {
  //   setShowMenu(true);
  // };

  useEffect(() => {
    if (showMenu) {
      console.log("showMenu  " + showMenu);
    }
  }, [showMenu]);

  const handleCloseNavMenu = () => {};
  console.log("is logged in  " + isLoggedIn);

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography>
                <BurgerSidebarMenu />
              </Typography>
              <Button
                color="inherit"
                onClick={() => navigate("/")}
                style={{ textTransform: "none" }}
              >
                <Grid >
                  <Typography paddingLeft="50px" variant="h6" component="div" sx={{ flexGrow: 3 }}>
                    readit
                  </Typography>
                </Grid>
              </Button>
              <MenuItem key={"tmp"} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">TMP</Typography>
              </MenuItem>
              {!isLoggedIn && (
                // <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                //   </Toolbar>
                // <div className={classes.align_right}>

                //   </div>
              )}
              {isLoggedIn && <Button color="inherit">Profile</Button>}
            </Toolbar>
          </AppBar>
        </Box>
      </StyledEngineProvider>
      {/* </ClickAwayListener> */}
    </div>
  );
};

export default Header;
