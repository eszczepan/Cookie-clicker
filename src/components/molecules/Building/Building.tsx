import React, { FC, useState, useRef } from "react";

import "./Building.css";
import { ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import BigCookie from "assets/images/cookies/BigCookie.png";

interface IProps {
  cost: number;
  cookies: number;
  cps: number;
  description: string;
  icon: string;
  icon64: string;
  index: number;
  title: string;
  quantity: number;
  handlePurchase(cost: number, index: number): void;
}

const Building: FC<IProps> = ({
  cost,
  cookies,
  cps,
  description,
  icon,
  icon64,
  index,
  title,
  quantity,
  handlePurchase,
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const isDisabled = cookies < cost ? true : false;
  const popoverIcon =
    title === "Grandma"
      ? require(`../../../assets/icons/${icon64}.gif`).default
      : require(`../../../assets/icons/${icon64}.png`).default;
  const popover = (
    <Popover id="popover-trigger-focus" className="mw-100">
      <Popover.Title className="text-primary d-flex">
        <img className="buildingImage" src={popoverIcon} alt={icon64} />
        <div className="d-flex align-items-center ml-3">
          <h3>{title}</h3>
        </div>
      </Popover.Title>
      <Popover.Content>
        <div>
          <strong>{description}</strong>
          <ul className="my-1 px-4">
            <li>
              Cost: <strong>{cost}</strong> cookies
            </li>
            <li>
              Each {title.toLowerCase()} produces <strong>{cps}</strong> cookies
              per second
            </li>
            <li>
              {quantity} producing{" "}
              <strong>
                {(quantity * Math.round((cps + Number.EPSILON) * 100)) / 100}
              </strong>{" "}
              cookies per second
            </li>
            <li>
              Owned: <strong>{quantity}</strong>
            </li>
          </ul>
        </div>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="focus"
      placement="auto"
      overlay={popover}
      show={show}
    >
      <ListGroup.Item
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        ref={target}
        as="li"
        disabled={isDisabled}
        className="building d-flex my-2 p-0 pr-2 justify-content-between align-items-center"
        onClick={() => handlePurchase(cost, index)}
      >
        <div className="d-flex align-items-center">
          <img
            className="buildingImage"
            src={require(`../../../assets/icons/${icon}.png`).default}
            alt={icon}
          />
          <div className="d-flex flex-column justify-content-around">
            <p className="h5 font-weight-bold m-0">{title}</p>
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
    </OverlayTrigger>
  );
};

export default Building;
