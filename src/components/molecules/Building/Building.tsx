import React, { FC } from "react";

import "./Building.css";
import BigCookie from "assets/images/cookies/BigCookie.png";

interface IProps {
  icon: string;
}

const Building: FC<IProps> = ({ icon }) => {
  return (
    <>
      <li className="building d-flex my-2 pr-2 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            className="buildingImage"
            src={require(`../../../assets/icons/${icon}.png`).default}
            alt=""
          />
          <div className="d-flex flex-column justify-content-around">
            <p className="h6 font-weight-bold m-0">Grandma</p>
            <p className="text-success">
              <span>
                <img className="priceIcon mr-1" src={BigCookie} alt="" />
              </span>
              100
            </p>
          </div>
        </div>
        <p className="buildingQuantity h3">12</p>
      </li>
    </>
  );
};

export default Building;
