import React, { useState } from "react";
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

const Leaderboard = (props) => {
  const [winter, setWinter] = useState(winterData);
  const [currentLevel, setCurrentLevel] = useState(winter);
  const [chess, setChess] = useState(chessData);
  const [assortOne, setAssortOne] = useState(assortOneData);
  const [assortTwo, setAssortTwo] = useState(assortTwoData);
  const [room, setRoom] = useState(roomData);
  const [hoarder, setHoarder] = useState(hoarderData);

  function changeLevel(level) {
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
  }

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
          <h2>Leaderboard: </h2>
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
