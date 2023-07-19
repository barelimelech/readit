import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import {
  AiFillDelete,
  AiFillDislike,
  AiFillLike,
  AiOutlineHistory,
} from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Button,
  Drawer,
  Tabs, Tab,
  List,
  Paper,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  StyledEngineProvider,
  DrawerHeader,
  Collapse,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

//Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

//Contexts
import StateContext from "../../contexts/StateContext";
import SearchContext from "../../contexts/SearchContext";
import GlobalContext from "../../contexts/GlobalContext";

import SearchesListSidebar from "./SearchesListSidebar";
import LinksListSidebar from "./LinksListSidebar";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "-webkit-fill-available",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "-webkit-fill-available",
  },
  listItemText: {
    fontSize: "1.5rem", // Replace with your desired font size
  },
  listItemIcon: {
    fontSize: "1.5rem",
  },
}));
const Menu = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();

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

  const [openUpcomingList, setOpenUpcomingList] = useState(false);
  const [openHistoryList, setOpenHistoryList] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(220); // Initial sidebar width

  const handleClickUpcomingList = () => {
    setOpenUpcomingList(!openUpcomingList);
  };
  const handleClickHistoryList = () => {
    setOpenHistoryList(!openHistoryList);
  };
  const handelClodeMenu = () => {
    toggleDrawer("left", false);
    //  setDrawerOpen(!drawerOpen);
  };
  const handleWordClick = (word) => {
    console.log(word);
    setGloblSearchTerm(word);
    setGlobalSearchBtn(true);
    navigate(`/results?q=${word}`);
    if (props.onWordClick) {
      props.onWordClick(word);
    }
    if (drawerState.left) {
      setDrawerState((prevState) => ({
        ...prevState,
        left: false,
      }));
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
        const response = await Axios.get(`${address.localhostIP}/api/searches`);
        setSearchList(response.data);
        setInitialDataFetched(true);
      } catch (e) {
        console.log("serxheslist error : " + e);
      }
    }
    if (!initialDataFetched) {
      getAllSearches();
    }
  }, [setSearchList, searchList]);

  useEffect(() => {
    if (isClicked || isClickedToUpcoming) {
      // toggleDrawer("left", false);

      const source = Axios.CancelToken.source();
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
  }, [isClicked, isClickedToUpcoming, setSearchList, searchList]);

  const handelWordToHistory = (item) => {
    console.log("3 " + item.id);
    setWordClicked(item);
    setIsClicked(true);
  };
  const handelWordToUpcoming = (item) => {
    console.log("3 " + item.id);
    setWordClicked(item);
    setIsClickedToUpcoming(true);
  };

  const handelWordDelete = (item) => {
    setWordClickedToDelete(item);
    setDeleteClicked(true);
    console.log("word deletee");
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <React.Fragment key={"left"}>
      <Button onClick={toggleDrawer("left", true)} style={{ color: "white" }}>
        <MenuIcon />
      </Button>
      <div width="-webkit-fill-available">
        <Drawer
          width="-webkit-fill-available"
          anchor={"left"}
          open={drawerState["left"]}
          onClose={toggleDrawer("left", false)}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <IconButton
            onClick={toggleDrawer("left", false)}
            style={{
              color: "black",
              marginLeft: "auto",
              marginTop: "10px",
              marginRight: "10px",
            }}
            size="large"
          >
            <BsArrowLeftShort />
          </IconButton>
          <div>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              indicatorColor="transparent"
              style={{ marginLeft: "10px" }}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Searches" style={{ minWidth: 120 }} />
              <Tab label="Links" style={{ minWidth: 120 }} />
              {/* <Tab label="Tab 3" /> */}
            </Tabs>

            {/* List for each tab */}

            {activeTab === 0 && (
              <div>
                <SearchesListSidebar
                  type="Upcoming"
                  isNew={true}
                  searchList={searchList}
                  handelWordDelete={handelWordDelete}
                  handelWordToUpcoming={handelWordToHistory}
                  handleWordClick={handleWordClick}
                />
                <SearchesListSidebar
                  type="History"
                  isNew={false}
                  searchList={searchList}
                  handelWordDelete={handelWordDelete}
                  handelWordToUpcoming={handelWordToUpcoming}
                  handleWordClick={handleWordClick}
                />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <LinksListSidebar width={sidebarWidth} />
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  );
};
export default Menu;
