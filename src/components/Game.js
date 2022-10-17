import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, Prompt } from "react-router-dom";
import "../styles/Game.css";
import { LocationPercentList } from "../assets/percentOffsetList";
import { CurrentBoardContext } from "../contexts/CurrentBoard";
import { db } from "../utils/firebase";
import { ref, set, push } from "firebase/database";

const Game = (props) => {
  const searchArray = props.search.map((value, key) => {
    return value.name;
  });
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
  const [imgHeight, setImgheight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const dropDownRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    return () => {
      props.search.map((value, key) => {
        value.found = false;
      });
    };
  }, []);

  //this function was in firebase.js --> writing to Google Firebase
  function writeUserData(board, name, time) {
    const reference = ref(db, board + "/");

    const newItem = push(reference);

    set(newItem, {
      username: name,
      time: time,
    });
  }

  useEffect(() => {
    // check to see if every item in list was found
    if (Object.keys(iSpyList).length === searchArray.length) {
      modalRef.current.style.display = "block";
      setEndTime(Math.floor(Date.now() / 1000));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

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

    //set img Height and Width
    setImgWidth(e.target.clientWidth);
    setImgheight(e.target.clientHeight);

    // move dropdown list depending on where the click is

    if (e.clientY - offsetTop > e.target.clientHeight / 2) {
      dropDownRef.current.style.top = e.clientY - 270 + "px";
    } else {
      dropDownRef.current.style.top = e.clientY + 40 + "px";
    }

    if (e.clientX - offsetLeft > e.target.clientWidth / 2) {
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
    console.log(currentBoard);
    const LocationListMap = LocationPercentList[ListKey];
    LocationListMap.map((value, key) => {
      if (LocationListMap[key]["name"] === item) {
        if (
          value.x * imgWidth + offsetX >= xValue - imgWidth * 0.05 &&
          value.x * imgWidth + offsetX <= xValue + imgWidth * 0.05
        ) {
          if (
            value.y * imgHeight + offsetY >= yValue - imgHeight * 0.05 &&
            value.y * imgHeight + offsetY <= yValue + imgHeight * 0.05
          ) {
            console.log("---Setting to found---");
            setToFound(item);
            LocationListMap[key]["found"] = true;
            console.log(LocationListMap[key]["found"]);
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

    props.search.map((value, key) => {
      value.found = false;
    });
    setShowStyle("hidden");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modalRef.current) {
      exitModal();
    }
  };

  return (
    <div>
      <div id="gameHolder">
        <div id="finderDiv">
          <h2 style={{ paddingLeft: "2vw" }}>I Spy List: </h2>
          <br />
          <br />
          <ul id="finderList">
            {props.search.map((value, key) => {
              let classEdit = searchArray[key]
                .replace(/\s+/g, "")
                .toLowerCase();
              return (
                <li
                  className={`searchField ${value.found ? "strike" : ""}`}
                  id={`search-${classEdit}`}
                  key={`search-${searchArray[key]}`}
                >
                  {searchArray[key]}
                </li>
              );
            })}
          </ul>
        </div>
        <div id="imgHolder">
          <img
            src={props.img}
            alt=""
            className="gameFull"
            onClick={(e) => {
              showList(e);
            }}
          />
        </div>
      </div>
      <div id="dropdown" className={showStyle} ref={dropDownRef}>
        <ul className="dropdownDiv">
          {props.search.map((value, key) => {
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
