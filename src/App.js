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

function App() {
  const Array1 = [
    "Kite",
    "Diamond Ring",
    "Hockey Stick",
    "Fish",
    "Car",
    "Book",
  ];

  const Array2 = ["Matches", "Number Three", "Lit Candle", "Letter"];

  const Array3 = [
    "Blue Push Pin",
    "Fish",
    "Alien",
    "Triceratops",
    "Snail",
    "Blue Umbrella",
  ];

  const Array4 = [
    "Teeth",
    "Blue Sunglasses",
    "'Letter 'K'",
    "Star Fish",
    "Shuttle Cock",
    "Zerba Stripes",
    "Corgi",
  ];

  const Array5 = [
    "Frog",
    "Soccer Player",
    "Cat",
    "Red Ribbon",
    "Belt",
    "Cell Phone",
    "Lemon",
  ];

  const Array6 = [
    "Sugar",
    "Spoon",
    "Car",
    "Rooster",
    "Pencil Sharpener",
    "Pearls",
    "Air Plane",
  ];
  return (
    <BrowserRouter>
      <div className="App" id="outer-container">
        <div id="page-wrap">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/game1"
              element={<Game img={levelOne} search={Array1} />}
            />
            <Route
              path="/game2"
              element={<Game img={levelTwo} search={Array2} />}
            />
            <Route
              path="/game3"
              element={<Game img={levelThree} search={Array3} />}
            />
            <Route
              path="/game4"
              element={<Game img={levelFour} search={Array4} />}
            />
            <Route
              path="/game5"
              element={<Game img={levelFive} search={Array5} />}
            />
            <Route
              path="/game6"
              element={<Game img={levelSix} search={Array6} />}
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
