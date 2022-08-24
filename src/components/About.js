import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div id="aboutMain">
      <div
        id="aboutDiv"
        onClick={() => {
          window.open(`https://github.com/khintz34`);
        }}
      >
        <h1>Project developed by @khintz34 for The Odin Project</h1>
        <ul id="aboutList">
          <li className="li-none">
            Utilized React for all front end and gameplay dev
          </li>
          <li className="li-none">Used Firebase for the backend </li>
          <li className="li-none">Six unique levels</li>
          <li className="li-none">Global leaderboard for each level</li>
        </ul>
        <h1>Click here to see other GitHub projects</h1>
      </div>
    </div>
  );
};

export default About;
