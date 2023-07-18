import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Drawer } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
//Icons

//Contexts
import StateContext from "../../contexts/StateContext";
import SearchContext from "../../contexts/SearchContext";
import GlobalContext from "../../contexts/GlobalContext";
import SearchesListSidebar from "./SearchesListSidebar";

import { Tab, Tabs, Box } from "@material-ui/core";
import LinksListSidebar from "./LinksListSidebar";

const minDrawerWidth = 200;
const maxDrawerWidth = 1000;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  toolbar:{minHeight: "20px"} ,
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
  // const [openHistoryList, setOpenHistoryList] = useState(false);
  const [newWidth, setNewWidth] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
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

  const handleWordClick = (word) => {
    console.log(word);
    setGloblSearchTerm(word);
    setGlobalSearchBtn(true);
    navigate(`/results?q=${word}`);
    if (props.onWordClick) {
      props.onWordClick(word);
    }
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

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setSidebarWidth(newWidth);
      setNewWidth(newWidth);
    }
  }, []);
  return (
    <div >
      {!isMobile && (
        <div>
          <div style={{ position: "absolute" }} />
          <div ref={sidebarRef}>
            <Drawer
              variant="permanent"
              style={{ width: sidebarWidth }}
              PaperProps={{ style: { width: sidebarWidth } }}
              className={classes.drawer}
            >
              <div className={classes.toolbar} />
              <div
                onMouseDown={(e) => handleMouseDown(e)}
                className={classes.dragger}
              />
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
                  <LinksListSidebar width={sidebarWidth}/>
                  </div>
                )}
              </div>
            </Drawer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSidebar;
