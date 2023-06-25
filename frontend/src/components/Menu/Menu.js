import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import { AiFillDelete, AiFillDislike } from "react-icons/ai";

import {
  Button,
  Drawer,
  List,
  Paper,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

//Contexts
import StateContext from "../../contexts/StateContext";

const Menu = (props) => {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const [searchList, setSearchList] = useState([]);
  const [wordClicked, setWordClicked] = useState([]);
  const [wordClickedToDelete, setWordClickedToDelete] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleWordClick = (word) => {
    console.log(word);
    if (props.onWordClick) {
      props.onWordClick(word);
    }
  };
  const [drawerState, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  useEffect(() => {
    async function getAllSearches() {
      try {
        await Axios.get(`http://localhost:8000/api/searches`).then(
          (response) => {
            setSearchList(response.data);
          }
        );
      } catch (e) {
        console.log("serxheslist error : " + e);
      }
    }
    getAllSearches();
  }, [searchList]);

  useEffect(() => {
    if (wordClicked.text !== "") {
      const source = Axios.CancelToken.source();
      async function updateSearch() {
        const formData = new FormData();
        formData.append("user", GlobalState.userId);
        formData.append("text", wordClicked.text);
        formData.append("isNew", false);
        formData.append("isDeleted", false);

        try {
          const response = await Axios.patch(
            `http://localhost:8000/api/searches/${wordClicked.id}/update/`,
            formData
          );
        } catch (error) {}
      }
      updateSearch();
    }
  }, [wordClicked]);

  const handelWordToHistory= (item) => {
    console.log("3 " +item.id);
    setWordClicked(item);
    setIsClicked(true);
  };

  const handelWordDelete= (item) => {
    setWordClickedToDelete(item);
    console.log("word deletee")
  };

  useEffect(() => {
    if (wordClickedToDelete.text !== "") {
      const source = Axios.CancelToken.source();
      async function updateSearch() {
        try {
          const response = await Axios.delete(
            `http://localhost:8000/api/searches/${wordClickedToDelete.id}/delete/`          );
        } catch (error) {}
      }
      updateSearch();
    }
  }, [wordClickedToDelete]);

  return (
    <React.Fragment key={"left"}>
      <Button onClick={toggleDrawer("left", true)} style={{ color: "white" }}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor={"left"}
        open={drawerState["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <h3 style={{ marginLeft: "10px", color: "black" }}>Upcoming</h3>
        <Paper style={{ maxHeight: 400, overflow: "auto" }}>
          <List>
            {searchList.length === 0 && <p>No searches yet...</p>}
            {searchList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleWordClick(item.text)}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  margin: "4px 9",
                }}
              >
                {String(item.user) === String(GlobalState.userId) &&
                  item.isNew === true && (
                    <div>
                      <Button onClick={() => handelWordToHistory(item)}>
                        <AiFillDislike />
                      </Button>
                      <Button style={{ color: "black" }}>{item.text}</Button>
                    </div>
                  )}
              </div>
            ))}
          </List>
        </Paper>

        <h3 style={{ marginLeft: "10px", color: "black" }}>History</h3>
        <Paper style={{ maxHeight: 400, overflow: "auto" }}>
          <List>
          
            {searchList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleWordClick(item.text)}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  margin: "4px 9",
                }}
              >
                {String(item.user) === String(GlobalState.userId) && item.isNew === false && (
                  <div>
                    <Button onClick={() => handelWordDelete(item)}>
                    <AiFillDelete />
                    </Button>
                    <Button>{item.text}</Button>
                  </div>
                )}
                {item.isNew === true && <p>No history yet...</p>}
              </div>
            ))}
          </List>
        </Paper>
      </Drawer>
    </React.Fragment>
  );
};
export default Menu;
