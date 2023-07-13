import React, { useContext, useEffect, useState } from "react";
import { List, ListItem, ListItemText, Grid, Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "./Search";
import SearchContext from "../../contexts/SearchContext";
import image from "../../Images/background.jpg";
import classes from "./SearchList.module.css";
import {ImSearch} from 'react-icons/im'
import {  useNavigate } from "react-router-dom";
import Axios from "axios";

const SearchesList = (props) => {
    const navigate = useNavigate();

  const { searchResults, setSearchResults } = useContext(SearchContext);

    const { globlSearchTerm, setGloblSearchTerm } = useContext(SearchContext);
    const { globalSearchBtn, setGlobalSearchBtn } = useContext(SearchContext);
  // const [searchTerm, setSearchTerm] = useState(globlSearchTerm);
  // const { globlSearchTerm, setGloblSearchTerm } = useContext(SearchContext);

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('q');
    if (!queryParam) {
      navigate("/");
    } else {
      setGlobalSearchBtn(true);
      setGloblSearchTerm(queryParam);
      navigate(`/results?q=${queryParam}`);
    }
  },[globlSearchTerm]);

   useEffect(() => {
     if (globalSearchBtn && globlSearchTerm !== "") {
       async function getSearchResults() {
         try {
           const apiKey = "AIzaSyAJmO8cYzZhBUym_dLJVXxVqzoEjSQxiwU";
           const cx = "858f2fc5425274d63";
           const numResults = 10; // Number of results to fetch
           const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${globlSearchTerm}&num=${numResults}`;
           const response = await Axios.get(apiUrl);
           if (response.status === 429) {
             setSearchResults(
               `https://www.google.com/search?q=${globlSearchTerm}`
             );
           } else {
             // const urlParams = new URLSearchParams(window.location.search);
             // urlParams.set("searchResults", JSON.stringify(response.data.items));
             // const newUrl = `${
             //   window.location.pathname
             // }?${urlParams.toString()}`;
             // window.history.pushState({ path: newUrl }, "", newUrl);
             // console.log("url :" +newUrl)
             setSearchResults(response.data.items);
             setGloblSearchTerm(globlSearchTerm);
             //  navigate(`/results?q=${globlSearchTerm}`);
           }
         } catch (error) {}
       }
       getSearchResults();
     }
   }, [globalSearchBtn, setGloblSearchTerm]);
  
  return (
    <div className="container contact__container">
      <Grid
        container
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Search />
        </Grid>

        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Search Results
        </h3>
        <Grid item xs={12}>
          <List>
            {searchResults.map((result) => (
              <ListItem key={result.cacheId} alignItems="flex-start">
                <ListItemText
                  primary={
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  }
                  secondary={result.snippet}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <h1>
          Explore other options <ImSearch />
        </h1>
        <Grid item xs={12} marginBottom={10}>
          <Box
            sx={{
              p: 2,
              border: "1px dashed grey",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`https://www.google.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              Google
            </a>
            <a
              href={`https://www.bing.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              Bing
            </a>

            <a
              href={`https://www.mojeek.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              mojeek
            </a>

            <a
              href={`https://search.yahoo.com/search?p=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "large" }}
            >
              yahoo
            </a>

            <a
              href={`https://search.brave.com/search?q=${globlSearchTerm}`}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "large",
                
              }}
            >
              brave
            </a>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchesList;
