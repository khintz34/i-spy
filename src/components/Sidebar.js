import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <Menu>
      <Link to="/" className="menu-item">
        Home
      </Link>
      <Link to="/leaderboard" className="menu-item">
        Leaderboard
      </Link>
      <Link to="/rules" className="menu-item">
        Rules
      </Link>
      <Link to="/about" className="menu-item">
        About
      </Link>
    </Menu>
  );
};

export default Sidebar;
