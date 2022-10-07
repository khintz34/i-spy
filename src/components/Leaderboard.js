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
      changeHeader("winter");
      getUserData("Winter Scene");
    }
  }, []);

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
  }, [currentBoard, currentLeaderArray]);

  //--------------------------------
  // ! this was in firebase... where should this be??
  // ---------------------

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

  //---------------------------------------

  function changeLevel(level) {
    if (level === "chess") {
      getUserData("Chess Scene");
    } else if (level === "winter") {
      getUserData("Winter Scene");
    } else if (level === "assortOne") {
      getUserData("Assortment One");
    } else if (level === "assortTwo") {
      getUserData("Assortment Two");
    } else if (level === "room") {
      getUserData("Room Scene");
    } else if (level === "hoarder") {
      getUserData("Hoarder Scene");
    }

    changeHeader(level);
  }

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

    // todo get rid of query selector
    let newID = document.querySelector(`#${idEdit}`);

    // TODO get rid of query selector
    let allBtns = document.querySelectorAll(".levelBtn");
    for (let i = 0; i < allBtns.length; i++) {
      allBtns[i].classList.remove("activeBtn");
    }

    newID.classList.add("activeBtn");
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
