import React from "react";
import "../styles/Level.css";

const Level = (props) => {
  return (
    <div>
      <img src={props.img} alt="" className="levelMini" />
    </div>
  );
};

export default Level;
