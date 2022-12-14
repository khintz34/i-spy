import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import "../styles/Sidebar.css";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <header>
      <div className="flex-center">
        <Link to="/" className="linkHead">
          <h1>I Spy: The Interactive Game</h1>
        </Link>
      </div>
      <div id="sidebarDivHolder">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
      </div>
    </header>
  );
};

export default Header;
