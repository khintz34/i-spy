import React from "react";
import "../styles/Leaderboard.css";

const LevelBtn = (props) => {
  const idEdit = props.level.replace(/\s+/g, "").toLowerCase();

  return (
    <button
      id={idEdit}
      className={props.class}
      onClick={() => {
        props.change(props.level);
      }}
    >
      {props.name}
    </button>
  );
};

export default LevelBtn;
