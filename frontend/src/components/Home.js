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
} from "@mui/material";

import Login from "./Authentication/Login";
import Search from './Search'

const Home = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  console.log("is logged in  " + isLoggedIn);

  return (
    <div>
      <Search/>
    </div>
  );
};

export default Home;
