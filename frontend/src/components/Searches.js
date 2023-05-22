import React from "react";

const Searches = () => {
  fetch("http://localhost:8000/api/searches/")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return <div>Searches</div>;
};

export default Searches;
