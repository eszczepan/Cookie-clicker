import React, { FC } from 'react';

import { nFormatter } from 'utils/nFormatter';
import BigCookie from 'assets/images/cookies/BigCookie.png';
import Milk from 'assets/images/background/milk-img.png';
import './CookieCounter.css';

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
        <p className="progressTitle pb-1 m-0">Total cookies: {nFormatter(totalCookies)}</p>
        <p className="progressTitle mb-3 pb-1">next level: {nFormatter(nextLevel)} cookies</p>
        <h3 className="progressTitle m-0 pt-1">
          <span>{nFormatter(counter)}</span> cookies
        </h3>
        <p className="progressTitle m-0 pb-1">per second: {nFormatter(cps)}</p>
      </div>
      <div onClick={setCounter} className="cookieContainer">
        <img className="cookieImage" src={BigCookie} alt="Big Cookie" />
      </div>
      <div className="milkWave">
        <img className="w-100 h-100" src={Milk} alt="Big Cookie" />
      </div>
    </div>
  );
};

export default CookieCounter;
