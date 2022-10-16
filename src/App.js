import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Game from "./components/Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import levelOne from "../src/images/levelOne.png";
import levelTwo from "../src/images/levelTwo.jpeg";
import levelThree from "../src/images/levelThree.jpeg";
import levelFour from "../src/images/levelFour.jpeg";
import levelFive from "../src/images/levelFive.jpeg";
import levelSix from "../src/images/levelSix.webp";
import Leaderboard from "./components/Leaderboard";
import Rules from "./components/Rules";
import About from "./components/About";
import { CurrentLevelContext } from "./contexts/CurrentLevel";
import { CurrentBoardContext } from "./contexts/CurrentBoard";
import { gameBoards } from "../src/assets/finderLists.js";
import { CurrentLeaderBoardContext } from "./contexts/CurrentLeaderBoardArray";
import { LocationPercentList } from "./assets/percentOffsetList";

function App() {
  const [currentLevel, setCurrentLevel] = useState([]);
  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentLeaderArray, setCurrentLeaderArray] = useState([]);

  return (
    <BrowserRouter>
      <div className="App" id="outer-container">
        <div id="page-wrap">
          <CurrentLevelContext.Provider
            value={{ currentLevel, setCurrentLevel }}
          >
            <CurrentBoardContext.Provider
              value={{ currentBoard, setCurrentBoard }}
            >
              <CurrentLeaderBoardContext.Provider
                value={{ currentLeaderArray, setCurrentLeaderArray }}
              >
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/game1"
                    element={
                      <Game
                        img={levelOne}
                        search={LocationPercentList["WinterLocations"].map(
                          (value, key) => {
                            return value.name;
                          }
                        )}
                      />
                    }
                  />
                  <Route
                    path="/game2"
                    element={
                      <Game
                        img={levelTwo}
                        search={LocationPercentList["ChessLocations"].map(
                          (value, key) => {
                            return value.name;
                          }
                        )}
                      />
                    }
                  />
                  <Route
                    path="/game3"
                    element={
                      <Game
                        img={levelThree}
                        search={LocationPercentList[
                          "AssortmentOneLocations"
                        ].map((value, key) => {
                          return value.name;
                        })}
                      />
                    }
                  />
                  <Route
                    path="/game4"
                    element={
                      <Game
                        img={levelFour}
                        search={LocationPercentList[
                          "AssortmentTwoLocations"
                        ].map((value, key) => {
                          return value.name;
                        })}
                      />
                    }
                  />
                  <Route
                    path="/game5"
                    element={
                      <Game
                        img={levelFive}
                        search={LocationPercentList["RoomLocations"].map(
                          (value, key) => {
                            return value.name;
                          }
                        )}
                      />
                    }
                  />
                  <Route
                    path="/game6"
                    element={
                      <Game
                        img={levelSix}
                        search={LocationPercentList["HoarderLocations"].map(
                          (value, key) => {
                            return value.name;
                          }
                        )}
                      />
                    }
                  />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </CurrentLeaderBoardContext.Provider>
            </CurrentBoardContext.Provider>
          </CurrentLevelContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
