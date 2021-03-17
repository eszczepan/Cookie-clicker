import React, { FC } from "react";

import BigCookie from "assets/images/cookies/BigCookie.png";
import "./CookieCounter.css";

interface IProps {
  counter: number;
  cps: number;
  setCounter(): void;
}

const CookieCounter: FC<IProps> = ({ counter, cps, setCounter }) => {
  return (
    <div className="h-100 d-flex flex-column justify-content-between align-items-center">
      <div className="w-100 my-3 py-1 d-flex flex-column text-center">
        <h4 className="progressTitle my-2 py-1">Level: 1</h4>
        <h3 className="progressTitle m-0 pt-1">
          <span style={{ fontSize: "32px" }}>{counter}</span> cookies
        </h3>
        <p className="progressTitle m-0 pb-1">per second: {cps}</p>
      </div>
      <div onClick={setCounter} className="cookieContainer">
        <img className="cookieImage" src={BigCookie} alt="Big Cookie" />
      </div>
      <div className="milkWave"></div>
    </div>
  );
};

export default CookieCounter;
