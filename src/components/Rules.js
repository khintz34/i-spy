import React from "react";
import levelOne from "../images/levelOne.jpeg";
import "../styles/Rules.css";

const Rules = (props) => {
  const ArrayTest = ["Dragon", "Tinker Bell", "Z", "Zebra", "Worm", "Shield"];
  return (
    <div id="gameHolder">
      <div id="finderDiv">
        <h2>I Spy List: </h2>
        <br />
        <br />
        <ul className="finderList rulesList">
          {(() => {
            const searches = [];
            for (let i = 0; i < ArrayTest.length; i++) {
              searches.push(
                <li className="searchField" key={`search-${ArrayTest[i]}`}>
                  {ArrayTest[i]}
                </li>
              );
            }
            return searches;
          })()}
        </ul>
        <div className="rulesList moveDown rulesDiv">
          These are the items you need to look for in the picture to the right
        </div>
        <div className="rulesRight rulesList rulesDiv">
          Click on the item in the picture to cross it off your list.
        </div>
        <div className="rulesBottom rulesList rulesDiv">
          Find each item to complete the level.
        </div>
        <div className="rulesWayBottom rulesList rulesDiv">
          Put in your user name to see where you landed on in the Leaderboard!
        </div>
      </div>
      <img src={levelOne} alt="" className="gameFull" />
    </div>
  );
};

export default Rules;
