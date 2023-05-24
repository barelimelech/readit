import React, { useState, useEffect } from 'react';
import './BurgerSidebarMenu.css';
import { Button } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";

const BurgerSidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.burger-sidebar-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`burger-sidebar-menu ${isOpen ? 'open' : ''}`}>
      <button className="burger-button" onClick={handleToggle}>
        <MenuIcon className="burger-icon"></MenuIcon>
      </button>
      <div className="sidebar-content">
         <ul className="menu-list">
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
          {/* Add more list items as needed */}
        </ul>
        {/* Add your sidebar menu content here */}
      </div>
    </div>
  );
};

export default BurgerSidebarMenu;
