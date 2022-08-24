import React from "react";
import "../styles/Game.css";

const Game = (props) => {
  const searchArray = props.search;
  return (
    <div id="gameHolder">
      <div id="finderDiv">
        <h2>I Spy List: </h2>
        <br />
        <br />
        <ul id="finderList">
          {(() => {
            const searches = [];
            for (let i = 0; i < searchArray.length; i++) {
              searches.push(
                <li className="searchField" key={`search-${searchArray[i]}`}>
                  {searchArray[i]}
                </li>
              );
            }
            return searches;
          })()}
        </ul>
      </div>
      <img src={props.img} alt="" className="gameFull" />
    </div>
  );
};

export default Game;
