import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Game.css";

const WinModal = (props) => {
  const userRef = useRef();
  const modalRef = useRef();
  return (
    <div id="winModal" className="modal" ref={props.modalRef}>
      <div className="modal-content">
        <h1>
          Congrats! You finished in
          <span> {props.endTime - props.startTime} </span>
          seconds!
        </h1>
        <h3 id="modalPara">
          Enter a username below to see how your time stacks up to the leaders
        </h3>
        <input
          type="text"
          placeholder="username"
          defaultValue={`userName-${props.random}`}
          id="userNameInput"
          maxLength="25"
          ref={userRef}
        />
        <div className="gameBtnSetUp">
          <button onClick={props.exitModal} className="btnSize exitBtnColor">
            Exit
          </button>
          <button onClick={props.submitModal} className="btnSize subBtnColor">
            <Link to="/leaderboard" className="linkSub">
              Submit
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
