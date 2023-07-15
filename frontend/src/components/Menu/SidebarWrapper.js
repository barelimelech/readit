import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  Button,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  StyledEngineProvider,
  TextField,
  Link,
  Typography,
  IconButton,
} from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
//Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  AiFillDelete,
  AiFillDislike,
  AiFillLike,
  AiOutlineHistory,
} from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
//Contexts
import StateContext from "../../contexts/StateContext";
import SearchContext from "../../contexts/SearchContext";
import GlobalContext from "../../contexts/GlobalContext";
import Menu from "./Menu";
const minDrawerWidth = 200;
const maxDrawerWidth = 1000;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  toolbar: theme.mixins.toolbar,
  dragger: {
    width: "5px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#f4f7f9",
  },
}));

const MenuSidebar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  //   const [searchList, setSearchList] = useState([]);
  const [wordClicked, setWordClicked] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [wordClickedToDelete, setWordClickedToDelete] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedToUpcoming, setIsClickedToUpcoming] = useState(false);
  const { searchList, setSearchList } = useContext(SearchContext);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const { globlSearchTerm, setGloblSearchTerm } = useContext(SearchContext);
  const { setSearchResults } = useContext(SearchContext);
  const { globalSearchBtn, setGlobalSearchBtn } = useContext(SearchContext);
  const address = useContext(GlobalContext);
  const [sidebarWidth, setSidebarWidth] = useState(220); // Initial sidebar width
  const [isResizing, setIsResizing] = useState(false); // State to track if resizing is in progress
  const sidebarRef = useRef(null); // Ref for the sidebar element
  const [openUpcomingList, setOpenUpcomingList] = useState(false);
  const [openHistoryList, setOpenHistoryList] = useState(false);
  const [newWidth, setNewWidth] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [numberOfUpcoming, setNumberOfUpcoming] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };
    // Call the handler on initial load
    handleResize();
    // Add a listener to update the state when the window is resized
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClickUpcomingList = () => {
    setOpenUpcomingList(!openUpcomingList);
  };
  const handleClickHistoryList = () => {
    setOpenHistoryList(!openHistoryList);
  };

  const handleWordClick = (word) => {
    console.log(word);
    setGloblSearchTerm(word);
    setGlobalSearchBtn(true);
      navigate(`/results?q=${word}`);
    if (props.onWordClick) {
      props.onWordClick(word);
    }
  };

  const handelCloseMenu = () => {
    setSidebarWidth(0);
  };
  const handelOpenMenu = () => {
    setSidebarWidth(minDrawerWidth);
  };
  //   const handleDrag = (event, { deltaX }) => {
  //     if (isResizing) return; // Do not handle dragging if resizing is in progress
  //     const newWidth = sidebarWidth + deltaX;
  //     setSidebarWidth(newWidth);
  //   };

  useEffect(() => {
    async function getAllSearches() {
      try {
        const response = await Axios.get(
          `${address.localhostIP}/api/searches`
        );
        setSearchList(response.data);
        setInitialDataFetched(true);
      } catch (e) {
        console.log("serxheslist error : " + e);
      }
    }
    if (!initialDataFetched) {
      getAllSearches();
    }
  }, [
    setSearchList,
    searchList,
    setGloblSearchTerm,
    globalSearchBtn,
    setGlobalSearchBtn,
  ]);

  useEffect(() => {
    if (isClicked || isClickedToUpcoming) {
      async function updateSearch() {
        const formData = new FormData();
        formData.append("user", GlobalState.userId);
        formData.append("text", wordClicked.text);
        if (isClicked === true) {
          formData.append("isNew", false);
        } else if (isClickedToUpcoming === true) {
          formData.append("isNew", true);
        }
        formData.append("isDeleted", false);
        formData.append("timestamp", new Date().toISOString());

        try {
          const response = await Axios.patch(
            `${address.localhostIP}/api/searches/${wordClicked.id}/update/`,
            formData
          );
          setSearchList((prevSearchList) =>
            prevSearchList.map((item) => {
              if (item.id === wordClicked.id) {
                return { ...item, ...response.data };
              }
              return item;
            })
          );
        } catch (error) {
          console.log("the error : " + error);
        }
      }
      updateSearch();
      setIsClicked(false);
      setIsClickedToUpcoming(false);
    }
  }, [
    isClicked,
    isClickedToUpcoming,
    setSearchList,
    searchList,
    setGloblSearchTerm,
  ]);

  const handelWordToHistory = (item) => {
    console.log("3 " + item.id);
    setWordClicked(item);
    setIsClicked(true);
  };
  const handelWordToUpcoming = (item) => {
    setWordClicked(item);
    setIsClickedToUpcoming(true);
  };
  const handelWordDelete = (item) => {
    setWordClickedToDelete(item);
    setDeleteClicked(true);
  };

  useEffect(() => {
    if (deleteClicked) {
      const source = Axios.CancelToken.source();
      async function updateSearch() {
        try {
          const response = await Axios.delete(
            `${address.localhostIP}/api/searches/${wordClickedToDelete.id}/delete/`
          );
          setSearchList((prevSearchList) =>
            prevSearchList.filter((item) => item.id !== wordClickedToDelete.id)
          );
        } catch (error) {}
      }
      updateSearch();
      setDeleteClicked(false);
    }
  }, [deleteClicked, setSearchList]);

  //menu design//
  const handleMouseDown = () => {
    // setIsResizing(true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    // setIsResizing(false);
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  // const handleMouseMove = useCallback(
  //   (e) => {
  //     const newWidth = e.clientX - document.body.offsetLeft;
  //     if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
  //       setSidebarWidth(newWidth);
  //       setNewWidth(newWidth);
  //     }
  //   },
  //   [setSidebarWidth]
  // );

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setSidebarWidth(newWidth);
      setNewWidth(newWidth);
    }
  }, []);
  return (
    // <Draggable axis="x">
    <div>
      {!isMobile && (
        <div>
          <div style={{ position: "absolute" }}>
            {/* <IconButton
              onClick={handelOpenMenu}
              style={{ marginTop: "40px", color: "black" }}
            >
              <MenuIcon />
            </IconButton> */}
          </div>
          <div ref={sidebarRef}>
            {/* <Button style={{ color: "black" }}>
              <MenuIcon />
            </Button> */}

            <Drawer
              variant="permanent"
              style={{ width: sidebarWidth }}
              PaperProps={{ style: { width: sidebarWidth } }}
            >
              <div className={classes.toolbar}>
                {/* <IconButton
                  onClick={handelCloseMenu}
                  style={{
                    color: "black",
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  <BsArrowLeftShort />
                </IconButton> */}
              </div>
              <div
                onMouseDown={(e) => handleMouseDown(e)}
                className={classes.dragger}
              />
              <List
                sx={{
                  width: "100%",
                  maxWidth: 1000,
                  bgcolor: "background.paper",
                  marginTop: "15px",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickUpcomingList}>
                  <ListItemIcon>
                    <MdWatchLater />
                  </ListItemIcon>
                  <ListItemText primary="Upcoming" />
                  {openUpcomingList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openUpcomingList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {searchList.map(
                      (item) =>
                        String(item.user) === String(GlobalState.userId) &&
                        item.isNew === true && (
                          <div
                            key={item.id}
                            style={{
                              cursor: "pointer",
                              padding: "8px",
                              borderRadius: "4px",
                              margin: "4px 9",
                            }}
                          >
                            <div>
                              <ListItem>
                                <Button
                                  onClick={() => handelWordDelete(item)}
                                  style={{ color: "black", minWidth: "40px" }}
                                >
                                  <AiFillDelete />
                                </Button>
                                <Button
                                  onClick={() => handelWordToHistory(item)}
                                  style={{ color: "black", minWidth: "40px" }}
                                >
                                  <AiFillDislike />
                                </Button>

                                <span
                                  component="button"
                                  onClick={() => handleWordClick(item.text)}
                                  style={{
                                    color: "black",
                                    maxWidth: "40%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontSize: "large",
                                  }}
                                >
                                  {item.text}
                                </span>
                              </ListItem>
                            </div>
                          </div>
                        )
                    )}
                    {numberOfUpcoming === true && <span>nothing</span>}
                  </List>
                </Collapse>
              </List>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 1000,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickHistoryList}>
                  <ListItemIcon>
                    <AiOutlineHistory />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                  {openHistoryList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openHistoryList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {searchList.map(
                      (item) =>
                        String(item.user) === String(GlobalState.userId) &&
                        item.isNew === false && (
                          <div
                            key={item.id}
                            style={{
                              cursor: "pointer",
                              padding: "8px",
                              borderRadius: "4px",
                              margin: "4px 9",
                            }}
                          >
                            <div>
                              <ListItem>
                                <Button
                                  onClick={() => handelWordDelete(item)}
                                  style={{ minWidth: "40px" }}
                                >
                                  <AiFillDelete />
                                </Button>
                                <Button
                                  onClick={() => handelWordToUpcoming(item)}
                                  style={{ minWidth: "40px" }}
                                >
                                  <AiFillLike />
                                </Button>
                                {/* <Typography noWrap> */}

                                <span
                                  component="button"
                                  onClick={() => handleWordClick(item.text)}
                                  style={{
                                    maxWidth: "40%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontSize: "large",
                                  }}
                                >
                                  {item.text}
                                </span>
                                {/* </Typography> */}
                              </ListItem>
                            </div>

                            {/* {item.isNew === true && <p>No history yet...</p>} */}
                          </div>
                        )
                    )}
                  </List>
                </Collapse>
              </List>
            </Drawer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSidebar;
