import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentLevelContext } from "../contexts/CurrentLevel";
import "../styles/Game.css";
import {
  assortOneData,
  assortTwoData,
  chessData,
  hoarderData,
  roomData,
  winterData,
} from "../assets/data";
import { CurrentBoardContext } from "../contexts/CurrentBoard";

const Game = (props) => {
  let random = Math.floor(Math.random() * 1000);
  const box = document.querySelector("#dropdown");
  const searchArray = props.search;
  // eslint-disable-next-line no-unused-vars
  const { currentLevel, setCurrentLevel } = useContext(CurrentLevelContext);
  // eslint-disable-next-line no-unused-vars
  const { currentBoard, setCurrentBoard } = useContext(CurrentBoardContext);
  const [iSpyList, setISpyList] = useState({});
  let modal = document.querySelector("#winModal");

  useEffect(() => {
    // set class for any li with true to strike

    // eslint-disable-next-line no-unused-vars
    for (let [key, value] of Object.entries(iSpyList)) {
      let classEdit = key.replace(/\s+/g, "").toLowerCase();
      let item = document.querySelector(`#search-${classEdit}`);
      item.classList.add("strike");
    }
  }, [iSpyList]);

  useEffect(() => {
    // check to see if every item in list was found
    if (Object.keys(iSpyList).length === searchArray.length) {
      modal.style.display = "block";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iSpyList]);

  function showList(e) {
    const box = document.querySelector("#dropdown");
    box.classList.remove("hidden");
    box.style.top = e.clientY + 40 + "px";
    box.style.left = e.clientX + 20 + "px";

    // Might need to move the positioning based on where the click is
  }

  function setToFound(item) {
    setISpyList((prevState) => {
      return {
        ...prevState,
        [item]: true,
      };
    });
  }

  function submitModal() {
    exitModal();
    if (searchArray[0] === "Matches") {
      setContexts(chessData, "Chess Scene");
    } else if (searchArray[0] === "Kite") {
      setContexts(winterData, "Winter Scene");
    } else if (searchArray[0] === "Blue Push Pin") {
      setContexts(assortOneData, "Assortment One");
    } else if (searchArray[0] === "Teeth") {
      setContexts(assortTwoData, "Assortment Two");
    } else if (searchArray[0] === "Frog") {
      setContexts(roomData, "Room Scene");
    } else if (searchArray[0] === "Sugar") {
      setContexts(hoarderData, "Hoarder Scene");
    }
  }

  function setContexts(level, board) {
    setCurrentLevel(level);
    setCurrentBoard(board);
  }

  function exitModal() {
    modal.style.display = "none";
    setISpyList({});
    for (let i = 0; i < searchArray.length; i++) {
      let classEdit = searchArray[i].replace(/\s+/g, "").toLowerCase();
      let item = document.querySelector(`#search-${classEdit}`);
      item.classList.remove("strike");
    }
    box.classList.add("hidden");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      exitModal();
    }
  };

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
              let classEdit = searchArray[i].replace(/\s+/g, "").toLowerCase();
              searches.push(
                <li
                  className="searchField"
                  id={`search-${classEdit}`}
                  key={`search-${searchArray[i]}`}
                >
                  {searchArray[i]}
                </li>
              );
            }
            return searches;
          })()}
        </ul>
      </div>
      <img
        src={props.img}
        alt=""
        className="gameFull"
        onClick={(e) => {
          showList(e);
        }}
      />
      <div id="dropdown" className="hidden">
        <ul className="dropdownDiv">
          {(() => {
            const searches = [];
            for (let i = 0; i < searchArray.length; i++) {
              searches.push(
                <li
                  className="dropField"
                  key={`search-${searchArray[i]}`}
                  onClick={() => {
                    setToFound(searchArray[i]);
                  }}
                >
                  {searchArray[i]}
                </li>
              );
            }
            return searches;
          })()}
        </ul>
      </div>
      <div id="winModal" className="modal">
        <div class="modal-content">
          <h1>
            Congrats! You finished in
            <span> {random} </span>
            seconds!
          </h1>
          <h3 id="modalPara">
            Enter a username below to see how your time stacks up to the leaders
          </h3>
          <input
            type="text"
            placeholder="username"
            defaultValue={`userName-${random}`}
            id="userNameInput"
            maxLength="25"
          />
          <div>
            <button onClick={exitModal}>Exit</button>
            <button onClick={submitModal}>
              <Link to="/leaderboard" className="linkSub">
                Submit
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
