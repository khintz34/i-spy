import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import "../styles/Sidebar.css";

// ...

const Sidebar = () => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/leaderboard">
        Leaderboard
      </a>
      <a className="menu-item" href="/rules">
        How to Play
      </a>
      <a className="menu-item" href="/about">
        About
      </a>
    </Menu>
  );
};

export default Sidebar;
