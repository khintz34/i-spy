import React, { useContext, useEffect, useState, useRef } from "react";
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
import {
  ChessLocations,
  WinterLocations,
  AssortmentOneLocations,
  AssortmentTwoLocations,
  RoomLocations,
  HoarderLocations,
} from "../assets/locationList.js";
import { CurrentBoardContext } from "../contexts/CurrentBoard";
import { db } from "../utils/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Game = (props) => {
  let random = Math.floor(Math.random() * 1000);
  const searchArray = props.search;
  const { currentLevel, setCurrentLevel } = useContext(CurrentLevelContext);
  const { currentBoard, setCurrentBoard } = useContext(CurrentBoardContext);
  const [iSpyList, setISpyList] = useState({});
  const [user, setUser] = useState("");
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000));
  const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000));
  const [userLevel, setUserLevel] = useState("");
  const [showStyle, setShowStyle] = useState("hidden");
  const dropDownRef = useRef();
  const userRef = useRef();
  const modalRef = useRef();

  //this function was in firebase.js --> writing to Google Firebase
  function writeUserData(board, name, time) {
    let displayArray = [];
    const reference = ref(db, board + "/");

    const newItem = push(reference);

    set(newItem, {
      username: name,
      time: time,
    });

    let obj = { username: name, time: time };
    addData(board, obj);

    function addData(obj) {
      displayArray.push(obj);
      sortArray();
    }

    function sortArray() {
      displayArray.sort((a, b) => {
        return a.time - b.time;
      });
    }
  }

  // ------------------------------------------
  // testing location clicks
  function checkLocation(e, searchItem) {
    console.log(currentBoard);
    if (currentBoard === "Winter Scene") {
      WinterLocations.map((value, key) => {
        console.log(WinterLocations[key]);
        if (WinterLocations[key]["name"] === searchItem) {
          console.log("yup");
        }
      });
    }
    console.log(e.clientX);
    console.log(searchItem);
    console.log("---------------");
  }

  //-------------------------------------------

  useEffect(() => {
    // check to see if every item in list was found
    if (Object.keys(iSpyList).length === searchArray.length) {
      modalRef.current.style.display = "block";
      setEndTime(Math.floor(Date.now() / 1000));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // set class for any li with true to strike

    for (let [key, value] of Object.entries(iSpyList)) {
      let classEdit = key.replace(/\s+/g, "").toLowerCase();
      // todo get rid of query selector
      let item = document.querySelector(`#search-${classEdit}`);
      item.classList.add("strike");
    }

    hideList();
  }, [iSpyList, searchArray.length]);

  function showList(e) {
    setShowStyle("");

    // move dropdown list depending on where the click is

    if (e.clientY > 520) {
      dropDownRef.current.style.top = e.clientY - 270 + "px";
    } else {
      dropDownRef.current.style.top = e.clientY + 40 + "px";
    }

    if (e.clientX > 720) {
      dropDownRef.current.style.left = e.clientX - 300 + "px";
    } else {
      dropDownRef.current.style.left = e.clientX + 20 + "px";
    }

    // console.log(`x: ${e.clientX}`);
    // console.log(`y: ${e.clientY}`);
  }

  function hideList() {
    setShowStyle("hidden");
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
    setUserLevel("");
    let userNameVal;
    let userLevelVal;

    exitModal();
    if (searchArray[0] === "Matches") {
      setContexts(chessData, "Chess Scene");
      setUserLevel("Chess Scene");
      userLevelVal = "Chess Scene";
    } else if (searchArray[0] === "Kite") {
      setContexts(winterData, "Winter Scene");
      setUserLevel("Winter Scene");
      userLevelVal = "Winter Scene";
    } else if (searchArray[0] === "Blue Push Pin") {
      setContexts(assortOneData, "Assortment One");
      setUserLevel("Assortment One");
      userLevelVal = "Assortment One";
    } else if (searchArray[0] === "Teeth") {
      setContexts(assortTwoData, "Assortment Two");
      setUserLevel("Assortment Two");
      userLevelVal = "Assortment Two";
    } else if (searchArray[0] === "Frog") {
      setContexts(roomData, "Room Scene");
      setUserLevel("Room Scene");
      userLevelVal = "Room Scene";
    } else if (searchArray[0] === "Sugar") {
      setContexts(hoarderData, "Hoarder Scene");
      setUserLevel("Hoarder Scene");
      userLevelVal = "Hoarder Scene";
    }

    setUser(userRef.current.value);
    userNameVal = userRef.current.value;
    //
    // writeUserData(userLevel, user, endTime - startTime);

    // this one works... but I should be using the state val
    writeUserData(userLevelVal, userNameVal, endTime - startTime);
  }

  function setContexts(level, board) {
    setCurrentLevel(level);
    setCurrentBoard(board);
  }

  function exitModal() {
    modalRef.current.style.display = "none";
    setISpyList({});
    for (let i = 0; i < searchArray.length; i++) {
      let classEdit = searchArray[i].replace(/\s+/g, "").toLowerCase();
      // todo get rid of query selector
      let item = document.querySelector(`#search-${classEdit}`);
      item.classList.remove("strike");
    }
    setShowStyle("hidden");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modalRef.current) {
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
          {searchArray.map((value, key) => {
            let classEdit = searchArray[key].replace(/\s+/g, "").toLowerCase();
            return (
              <li
                className="searchField"
                id={`search-${classEdit}`}
                key={`search-${searchArray[key]}`}
              >
                {searchArray[key]}
              </li>
            );
          })}
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
      <div id="dropdown" className={showStyle} ref={dropDownRef}>
        <ul className="dropdownDiv">
          {searchArray.map((value, key) => {
            return (
              <li
                className="dropField"
                key={`search-${searchArray[key]}`}
                onClick={(e) => {
                  setToFound(searchArray[key]);
                  checkLocation(e, searchArray[key]);
                }}
              >
                {searchArray[key]}
              </li>
            );
          })}
        </ul>
        <button id="dropDownExitBtn" onClick={hideList}>
          X
        </button>
      </div>
      <div id="winModal" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h1>
            Congrats! You finished in
            <span> {endTime - startTime} </span>
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
            ref={userRef}
          />
          <div className="gameBtnSetUp">
            <button onClick={exitModal} className="btnSize exitBtnColor">
              Exit
            </button>
            <button onClick={submitModal} className="btnSize subBtnColor">
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
