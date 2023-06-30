import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
