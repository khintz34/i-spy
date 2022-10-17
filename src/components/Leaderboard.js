/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import "../styles/Leaderboard.css";
import LevelBtn from "./LevelBtn";
import { CurrentBoardContext } from "../contexts/CurrentBoard";
import { CurrentLeaderBoardContext } from "../contexts/CurrentLeaderBoardArray";
import { getDatabase, ref, set, push, onValue, child } from "firebase/database";
import { db } from "../utils/firebase";

const Leaderboard = (props) => {
  const { currentBoard, setCurrentBoard } = useContext(CurrentBoardContext);
  const { currentLeaderArray, setCurrentLeaderArray } = useContext(
    CurrentLeaderBoardContext
  );

  // default to winter scene if blank
  useEffect(() => {
    if (currentBoard.length === 0) {
      changeLevel("winter");
      getUserData("Winter Scene");
    }
  }, []);

  const activeKey = {
    "Winter Scene": "winter",
    "Chess Scene": "chess",
    "Assortment One": "assortOne",
    "Assortment Two": "assortTwo",
    "Room Scene": "room",
    "Hoarder Scene": "hoarder",
  };

  function getUserData(board) {
    const boardRef = ref(db, board + "/");
    let displayArray = [];

    onValue(
      boardRef,
      (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          let obj = { username: childData.username, time: childData.time };
          addData(obj);
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj) {
      displayArray.push(obj);
      sortArray();
    }

    function sortArray() {
      displayArray.sort((a, b) => {
        return a.time - b.time;
      });
      setCurrentLeaderArray(displayArray);
    }
  }

  // todo figure out how to not get duplicate data in the leader board
  // todo do I need to setCurrentLeaderArray([]) in game.js on exit?

  //---------------------------------------

  const levelKey = {
    winter: "Winter Scene",
    chess: "Chess Scene",
    assortOne: "Assortment One",
    assortTwo: "Assortment Two",
    room: "Room Scene",
    hoarder: "Hoarder Scene",
  };

  function changeLevel(level) {
    getUserData(levelKey[level]);
    setCurrentBoard(levelKey[level]);
  }

  const buttonClass = (level) => {
    if (level === currentBoard) {
      return "levelBtn activeBtn";
    } else {
      return "levelBtn";
    }
  };

  return (
    <div id="leader-main">
      <div className="sideDiv">
        <h2>Levels:</h2>
        <div className="levelHolder">
          <LevelBtn
            name="Winter Scene"
            level="winter"
            change={changeLevel}
            class={buttonClass("Winter Scene")}
          ></LevelBtn>
          <LevelBtn
            name="Chess Scene"
            level="chess"
            change={changeLevel}
            class={buttonClass("Chess Scene")}
          ></LevelBtn>
          <LevelBtn
            name="Assortment One"
            level="assortOne"
            change={changeLevel}
            class={buttonClass("Assortment One")}
          ></LevelBtn>
          <LevelBtn
            name="Assortment Two"
            level="assortTwo"
            change={changeLevel}
            class={buttonClass("Assortment Two")}
          ></LevelBtn>
          <LevelBtn
            name="Room Scene"
            level="room"
            change={changeLevel}
            class={buttonClass("Room Scene")}
          ></LevelBtn>
          <LevelBtn
            name="Hoarder Scene"
            level="hoarder"
            change={changeLevel}
            class={buttonClass("Hoarder Scene")}
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
                  <th className="time">Time (sec)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentLeaderArray.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{value.username}</td>
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
