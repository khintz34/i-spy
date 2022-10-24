import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

// const Sidebar = () => {
//   return (
//     <Menu>
//       <a className="menu-item" href="/">
//         <Link to="/">Home</Link>
//       </a>
//       <a className="menu-item" href="/leaderboard">
//         Leaderboard
//       </a>
//       <a className="menu-item" href="/rules">
//         How to Play
//       </a>
//       <a className="menu-item" href="/about">
//         About
//       </a>
//     </Menu>
//   );
// };

// export default Sidebar;

const Sidebar = () => {
  return (
    <Menu>
      <Link to="/" className="menu-item">
        Home
      </Link>
      <Link to="/leadboard" className="menu-item">
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
