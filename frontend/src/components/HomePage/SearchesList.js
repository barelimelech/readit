import React,{useContext} from "react";
import { List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SearchContext from "../../contexts/SearchContext";

const SearchesList = (props) => {
  // const location = useLocation();
  // const searchResults = location.state?.searchResults || [];
  // const location = useLocation();
  // const { searchResults } = location.state;

  // const { searchResults } = props.location.state; 
  // fetch("http://localhost:8000/api/searches/")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
  // const { data } = useParams();
  // const searchResults = JSON.parse(data);
  const { searchResults } = useContext(SearchContext);

  return (
    <div>
      <h2>Search Results</h2>
      <List>
        {searchResults.map((result) => (
          <ListItem key={result.cacheId} alignItems="flex-start">
            <ListItemText
              primary={
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              }
              secondary={result.snippet}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchesList;
