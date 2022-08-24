import React from "react";
import "../styles/Header.css";
import "../styles/Sidebar.css";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <header>
      <div className="flex-center">
        <h1>I Spy: The Interactive Game</h1>
      </div>
      <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
    </header>
  );
};

export default Header;
