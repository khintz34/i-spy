import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CurrentLevelContext } from "../contexts/CurrentLevel";
import "../styles/Game.css";
import { LocationList } from "../assets/pixelOffsetList.js";
import { CurrentBoardContext } from "../contexts/CurrentBoard";
import { db } from "../utils/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Game = (props) => {
  const searchArray = props.search;
  const { currentBoard, setCurrentBoard } = useContext(CurrentBoardContext);
  const [iSpyList, setISpyList] = useState({});
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000));
  const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000));
  const [showStyle, setShowStyle] = useState("hidden");
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [username, setUsername] = useState("");
  const dropDownRef = useRef();
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

    // set location of click
    setXValue(e.clientX);
    setYValue(e.clientY);

    // set offsets
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = e.target.getBoundingClientRect();
    let offsetLeft = elemRect.left - bodyRect.left;
    let offsetTop = elemRect.top - bodyRect.top;

    setOffsetX(offsetLeft);
    setOffsetY(offsetTop);

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
  }

  function hideList() {
    setShowStyle("hidden");
  }

  const LocationKey = {
    "Winter Scene": "WinterLocations",
    "Chess Scene": "ChessLocations",
    "Assortment One": "AssortmentOneLocations",
    "Assortment Two": "AssortmentTwoLocations",
    "Room Scene": "RoomLocations",
    "Hoarder Scene": "HoarderLocations",
  };

  function checkLocation(item) {
    console.log("---Checking Location---");
    const ListKey = LocationKey[currentBoard];
    const LocationListMap = LocationList[ListKey];
    LocationListMap.map((value, key) => {
      if (LocationListMap[key]["name"] === item) {
        console.log("new value: ", value.x, offsetX);
        console.log("xVal: ", xValue);
        if (
          value.x + offsetX >= xValue - 50 &&
          value.x + offsetX <= xValue + 50
        ) {
          if (
            value.y + offsetY >= yValue - 50 &&
            value.y + offsetY <= yValue + 50
          ) {
            console.log("---Setting to found---");
            setToFound(item);
          } else {
            console.log("Wrong Item Clicked, wrong Y Value");
          }
        } else {
          console.log("Wrong Item Clicked, wrong X Value");
        }
      }
    });
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
    console.log("---SUBMIT MODAL---");
    writeUserData(currentBoard, username, endTime - startTime);
    console.log("writing data", currentBoard, username, endTime - startTime);
    console.log("----------------");
    exitModal();
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
                  checkLocation(searchArray[key]);
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
            id="userNameInput"
            maxLength="25"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
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
