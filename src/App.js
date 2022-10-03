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
import { useState } from "react";
import { CurrentBoardContext } from "./contexts/CurrentBoard";
import {
  assortOneList,
  assortTwoList,
  chessList,
  hoarderList,
  roomList,
  winterList,
} from "../src/assets/finderLists.js";
import { winterData } from "./assets/data";
import { getUserData } from "./utils/firebase";
import { CurrentLeaderBoardContext } from "./contexts/CurrentLeaderBoardArray";

function App() {
  const [currentLevel, setCurrentLevel] = useState([]);
  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentLeaderArray, setCurrentLeaderArray] = useState([]);

  function initLeaderBoards(dataList) {
    getUserData(dataList);
  }

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
                    element={<Game img={levelOne} search={winterList} />}
                  />
                  <Route
                    path="/game2"
                    element={<Game img={levelTwo} search={chessList} />}
                  />
                  <Route
                    path="/game3"
                    element={<Game img={levelThree} search={assortOneList} />}
                  />
                  <Route
                    path="/game4"
                    element={<Game img={levelFour} search={assortTwoList} />}
                  />
                  <Route
                    path="/game5"
                    element={<Game img={levelFive} search={roomList} />}
                  />
                  <Route
                    path="/game6"
                    element={<Game img={levelSix} search={hoarderList} />}
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
