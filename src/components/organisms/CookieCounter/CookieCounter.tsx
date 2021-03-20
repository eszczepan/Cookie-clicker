import React, { FC } from "react";

import BigCookie from "assets/images/cookies/BigCookie.png";
import "./CookieCounter.css";

interface IProps {
  totalCookies: number;
  counter: number;
  cps: number;
  level: number;
  setCounter(): void;
  nextLevel: number;
}

const CookieCounter: FC<IProps> = ({
  totalCookies,
  counter,
  cps,
  level,
  nextLevel,
  setCounter,
}) => {
  return (
    <div className="h-100 d-flex flex-column justify-content-between align-items-center">
      <div className="w-100 my-3 py-1 d-flex flex-column text-center">
        <h3 className="progressTitle pt-1 m-0">Level: {level}</h3>
        <p className="progressTitle pb-1 m-0">Total cookies: {totalCookies}</p>
        <p className="progressTitle mb-3 pb-1">
          next level: {nextLevel} cookies
        </p>
        <h3 className="progressTitle m-0 pt-1">
          <span>{counter}</span> cookies
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
