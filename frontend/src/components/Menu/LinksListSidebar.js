import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

//mui
import {
  Button,
  List,
  TextField,
  Grid,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
//style
import { makeStyles } from "@material-ui/core";
import { FiLink } from "react-icons/fi";

//Contexts
import StateContext from "../../contexts/StateContext";
import GlobalContext from "../../contexts/GlobalContext";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
}));

const LinksListSidebar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [isSavedClicked, setIsSavedClicked] = useState(false);
  const GlobalState = useContext(StateContext);
  const address = useContext(GlobalContext);
  const [linksList, setLinksList] = useState([]);
  const [linkClickedToDelete, setLinkClickedToDelete] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [addLinkIsClicked, setAddLinkIsClicked] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");

  const handleOpenTextField = () => {
    setAddLinkIsClicked(true);
    setIsSavedClicked(false);

    setIsOpen(true);
    document.getElementById("pasteButton");
    navigator.clipboard
      .readText()
      .then(function (text) {
        var pasteOutput = document.getElementById("pasteOutput");
        pasteOutput.value = text;
        console.log("Pasted text:", text);

        setTextFieldValue(text);
        console.log("Pasted text2 :", textFieldValue);
      })
      .catch(function (err) {
        console.error("Failed to read clipboard text: ", err);
      });
  };

  const handleSaveTextField = (event) => {
    event.preventDefault();
    setIsSavedClicked(true);
    // setIsOpen(false);
  };

  const handleCancelTextField = () => {
    setIsSavedClicked(false);
    setIsOpen(false);
    setTextFieldValue("");
  };

useEffect(() => {
  if (isSavedClicked && textFieldValue !== "") {
    async function addLinkAndFetchTitle() {
      try {
        // Fetch title
        const getTitleResponse = await Axios.get(
          `${address.localhostIP}/api/get-website-title/?url=${textFieldValue}`
        );
        const { title } = getTitleResponse.data;
        setLinkTitle(title);

        // Add link
        const linkData = new FormData();
        linkData.append("user", GlobalState.userId);
        if (
          title === "Redirecting..." ||
          title === undefined ||
          title === "No title found"
        ) {
          linkData.append("title", textFieldValue);
        } else {
          linkData.append("title", title);
        }
        linkData.append("href", textFieldValue);
        linkData.append("isDeleted", false);
        linkData.append("timestamp", new Date().toISOString());

        const addLinkResponse = await Axios.post(
          `${address.localhostIP}/api/links/create/`,
          linkData
        );

        setLinksList((prevSearchList) => [
          addLinkResponse.data,
          ...prevSearchList,
        ]);
        setIsOpen(false);
        setLinkTitle("");
        console.log("Response:", addLinkResponse);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    addLinkAndFetchTitle();
  }
}, [
  isSavedClicked,
  textFieldValue,
  setLinkTitle,
  setLinksList,
  setIsOpen,
  GlobalState.userId,
]);


  useEffect(() => {
    async function addLink() {
      try {
        const response = await Axios.get(`${address.localhostIP}/api/links/`);
        setLinksList(response.data);
      } catch (error) {
        console.error("Error:", error); // Check the error message
      }
    }
    addLink();
  }, []);

  const handelLinkDelete = (item) => {
    setLinkClickedToDelete(item);
    setDeleteClicked(true);
  };

  useEffect(() => {
    if (deleteClicked) {
      async function updateSearch() {
        try {
          const response = await Axios.delete(
            `${address.localhostIP}/api/links/${linkClickedToDelete.id}/delete/`
          );
          setLinksList((prevSearchList) =>
            prevSearchList.filter((item) => item.id !== linkClickedToDelete.id)
          );
        } catch (error) {}
      }
      updateSearch();
      setDeleteClicked(false);
    }
  }, [deleteClicked, setLinksList]);

  const handleLinkClick = (link) => {
    console.log(link);
    const isAbsoluteURL =
      link.startsWith("http://") || link.startsWith("https://");

    if (isAbsoluteURL) {
      const url = isAbsoluteURL ? link : `http://${link}`;
      const newTab = window.open(url, "_blank");
      newTab.focus(); // Optional: Set focus to the new tab
    } else {
        const url =
          link.startsWith("http://") || link.startsWith("https://")
            ? link
            : "http://" + link;
       window.open(url, "_blank");

      //navigate(link); // Navigate to the internal route
    }
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        // Do something with the pasted text
        console.log("Pasted content:", text);
        setTextFieldValue(text);
      })
      .catch((error) => {
        console.log("Paste failed:", error);
      });
  };

  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        height: "100vh",
        marginTop: "30px",
      }}
    >
      {isOpen ? (
        <div>
          <TextField
            id="pasteOutput"
            required
            label="Enter Link"
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            style={{ width: props.width - 40, marginLeft: "20px" }}
          />
          <div style={{ marginLeft: "20px", marginTop: "16px" }}>
            <Button variant="contained" onClick={handleSaveTextField}>
              Save
            </Button>
            <Button onClick={handlePaste} style={{ marginLeft: "8px" }}>
              Paste
            </Button>
            <Button
              variant="contained"
              onClick={handleCancelTextField}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.container}>
            <Button
              id="pasteButton"
              onClick={handleOpenTextField}
              variant="contained"
              style={{ textTransform: "initial" }}
            >
              Add Link
              <FiLink />
            </Button>
          </div>
          <List component="div" disablePadding>
            {linksList.map(
              (item) =>
                String(item.user) === String(GlobalState.userId) && (
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
                          onClick={() => handelLinkDelete(item)}
                          style={{ minWidth: "40px" }}
                        >
                          <AiFillDelete />
                        </Button>

                        <span
                          component="button"
                          onClick={() => handleLinkClick(item.href)}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: "large",
                          }}
                        >
                          {item.title}
                        </span>
                      </ListItem>
                    </div>
                  </div>
                )
            )}
          </List>
        </div>
      )}
    </div>
  );
};

export default LinksListSidebar;
