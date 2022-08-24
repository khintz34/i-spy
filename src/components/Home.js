import React from "react";
import Level from "./Level";
import levelOne from "../images/levelOne.png";
import levelTwo from "../images/levelTwo.jpeg";
import levelThree from "../images/levelThree.jpeg";
import levelFour from "../images/levelFour.jpeg";
import levelFive from "../images/levelFive.jpeg";
import levelSix from "../images/levelSix.webp";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div id="app-main">
      <div id="chooseLevel">
        <h2>Choose Your Level:</h2>
      </div>
      <div id="levelHolder">
        <Link to="/game1" className="link">
          <Level name="Winter Scene" img={levelOne} />
        </Link>
        <Link to="/game2" className="link">
          <Level name="Chess Scene" img={levelTwo} />
        </Link>
        <Link to="/game3" className="link">
          <Level name="Assortment One" img={levelThree} />
        </Link>
        <Link to="/game4" className="link">
          <Level name="Assortment Two" img={levelFour} />
        </Link>
        <Link to="/game5" className="link">
          <Level name="Room Scene" img={levelFive} />
        </Link>
        <Link to="/game6" className="link">
          <Level name="Hoarder Scene" img={levelSix} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
