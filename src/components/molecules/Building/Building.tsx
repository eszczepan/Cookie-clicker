import React, { FC } from "react";

import "./Building.css";
import { ListGroup } from "react-bootstrap";
import BigCookie from "assets/images/cookies/BigCookie.png";

interface IProps {
  cost: number;
  cookies: number;
  icon: string;
  index: number;
  title: string;
  quantity: number;
  handlePurchase(cost: number, index: number): void;
}

const Building: FC<IProps> = ({
  cost,
  cookies,
  icon,
  index,
  title,
  quantity,
  handlePurchase,
}) => {
  const isDisabled = cookies < cost ? true : false;
  return (
    <>
      <ListGroup.Item
        as="li"
        disabled={isDisabled}
        className="building d-flex my-2 pr-2 justify-content-between align-items-center"
        onClick={() => handlePurchase(cost, index)}
      >
        <div className="d-flex align-items-center">
          <img
            className="buildingImage"
            src={require(`../../../assets/icons/${icon}.png`).default}
            alt={icon}
          />
          <div className="d-flex flex-column justify-content-around">
            <p className="h6 font-weight-bold m-0">{title}</p>
            <p className="text-success">
              <span>
                <img className="priceIcon mr-1" src={BigCookie} alt="" />
              </span>
              {cost}
            </p>
          </div>
        </div>
        <p className="buildingQuantity h3">{quantity}</p>
      </ListGroup.Item>
    </>
  );
};

export default Building;
