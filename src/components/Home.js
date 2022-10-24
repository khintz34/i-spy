import React, { useContext } from "react";
import Level from "./Level";
import levelOne from "../images/levelOne.png";
import levelTwo from "../images/levelTwo.jpeg";
import levelThree from "../images/levelThree.jpeg";
import levelFour from "../images/levelFour.jpeg";
import levelFive from "../images/levelFive.jpeg";
import levelSix from "../images/levelSix.webp";
import { Link } from "react-router-dom";
import { CurrentBoardContext } from "../contexts/CurrentBoard";
import { AuthContext } from "../contexts/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Home = (props) => {
  const { currentBoard, setCurrentBoard } = useContext(CurrentBoardContext);
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);

  if (!currentAuth) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setCurrentAuth(true);
        console.log(user.name);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div id="app-main">
      <div id="chooseLevel">
        <h2>Choose Your Level:</h2>
      </div>
      <div id="levelHolder">
        <Link
          to="/game1"
          className="link"
          onClick={() => setCurrentBoard("Winter Scene")}
        >
          <Level name="Winter Scene" img={levelOne} />
        </Link>
        <Link
          to="/game2"
          className="link"
          onClick={() => setCurrentBoard("Chess Scene")}
        >
          <Level name="Chess Scene" img={levelTwo} />
        </Link>
        <Link
          to="/game3"
          className="link"
          onClick={() => setCurrentBoard("Assortment One")}
        >
          <Level name="Assortment One" img={levelThree} />
        </Link>
        <Link
          to="/game4"
          className="link"
          onClick={() => setCurrentBoard("Assortment Two")}
        >
          <Level name="Assortment Two" img={levelFour} />
        </Link>
        <Link
          to="/game5"
          className="link"
          onClick={() => setCurrentBoard("Room Scene")}
        >
          <Level name="Room Scene" img={levelFive} />
        </Link>
        <Link
          to="/game6"
          className="link"
          onClick={() => setCurrentBoard("Hoarder Scene")}
        >
          <Level name="Hoarder Scene" img={levelSix} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
