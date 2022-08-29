import React, { useState, useContext, useEffect } from "react";
import "../styles/Leaderboard.css";
import LevelBtn from "./LevelBtn";
import {
  assortOneData,
  assortTwoData,
  chessData,
  hoarderData,
  roomData,
  winterData,
} from "../assets/data";
import { CurrentLevelContext } from "../contexts/CurrentLevel";
import { CurrentBoardContext } from "../contexts/CurrentBoard";

const Leaderboard = (props) => {
  const { currentLevel, setCurrentLevel } = useContext(CurrentLevelContext);
  const { currentBoard, setCurrentBoard } = useContext(CurrentBoardContext);
  const [winter, setWinter] = useState(winterData);
  const [chess, setChess] = useState(chessData);
  const [assortOne, setAssortOne] = useState(assortOneData);
  const [assortTwo, setAssortTwo] = useState(assortTwoData);
  const [room, setRoom] = useState(roomData);
  const [hoarder, setHoarder] = useState(hoarderData);

  const changeLevel = (level) => {
    if (level === "chess") {
      setCurrentLevel(chess);
    } else if (level === "winter") {
      setCurrentLevel(winter);
    } else if (level === "assortOne") {
      setCurrentLevel(assortOne);
    } else if (level === "assortTwo") {
      setCurrentLevel(assortTwo);
    } else if (level === "room") {
      setCurrentLevel(room);
    } else if (level === "hoarder") {
      setCurrentLevel(hoarder);
    }

    changeHeader(level);
  };

  function changeHeader(level) {
    if (level === "chess") {
      setCurrentBoard("Chess Scene");
    } else if (level === "winter") {
      setCurrentBoard("Winter Scene");
    } else if (level === "assortOne") {
      setCurrentBoard("Assortment One");
    } else if (level === "assortTwo") {
      setCurrentBoard("Assortment Two");
    } else if (level === "room") {
      setCurrentBoard("Room Scene");
    } else if (level === "hoarder") {
      setCurrentBoard("Hoarder Scene");
    }

    activateButton(level);
  }

  function activateButton(level) {
    const idEdit = level.replace(/\s+/g, "").toLowerCase();
    let newID = document.querySelector(`#${idEdit}`);

    let allBtns = document.querySelectorAll(".levelBtn");
    for (let i = 0; i < allBtns.length; i++) {
      allBtns[i].classList.remove("activeBtn");
    }

    newID.classList.add("activeBtn");
  }

  useEffect(() => {
    if (currentBoard === "HoarderScene") {
      activateButton("hoarder");
    } else if (currentBoard === "Winter Scene") {
      activateButton("winter");
    } else if (currentBoard === "Chess Scene") {
      activateButton("chess");
    } else if (currentBoard === "Assortment One") {
      activateButton("assortOne");
    } else if (currentBoard === "Assortment Two") {
      activateButton("assortTwo");
    } else if (currentBoard === "Room Scene") {
      activateButton("room");
    }
    console.log(currentBoard);
  });

  return (
    <div id="leader-main">
      <div className="sideDiv">
        <h2>Levels:</h2>
        <div className="levelHolder">
          <LevelBtn
            name="Winter Scene"
            level="winter"
            change={changeLevel}
          ></LevelBtn>
          <LevelBtn
            name="Chess Scene"
            level="chess"
            change={changeLevel}
          ></LevelBtn>
          <LevelBtn
            name="Assortment One"
            level="assortOne"
            change={changeLevel}
          ></LevelBtn>
          <LevelBtn
            name="Assortment Two"
            level="assortTwo"
            change={changeLevel}
          ></LevelBtn>
          <LevelBtn
            name="Room Scene"
            level="room"
            change={changeLevel}
          ></LevelBtn>
          <LevelBtn
            name="Hoarder Scene"
            level="hoarder"
            change={changeLevel}
          ></LevelBtn>
        </div>
      </div>
      <div id="leaderboard">
        <div className="divHeader">
          <h2>Leaderboard: {currentBoard}</h2>
        </div>
        <div id="board">
          <div id="topTen">
            <table id="tableTop">
              <thead>
                <tr>
                  <th className="rank">Rank</th>
                  <th className="player">Player</th>
                  <th className="time">Time</th>
                </tr>
              </thead>
              <tbody>
                {currentLevel.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
