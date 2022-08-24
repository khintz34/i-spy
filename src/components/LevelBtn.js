import React from "react";
import "../styles/Leaderboard.css";

const LevelBtn = (props) => {
  console.log(props);
  return (
    <button
      className="levelBtn"
      onClick={() => {
        props.change(props.level);
      }}
    >
      {props.name}
    </button>
  );
};

export default LevelBtn;
