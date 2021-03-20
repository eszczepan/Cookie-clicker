import React, { FC } from "react";

import "./Store.css";
import { ListGroup } from "react-bootstrap";
import { IBuilding } from "typings/models";
import Building from "components/molecules/Building/Building";

interface IProps {
  buildings: IBuilding[];
  cookies: number;
  handlePurchase(cost: number, index: number): void;
  level: number;
}

const Store: FC<IProps> = ({ buildings, cookies, handlePurchase, level }) => {
  return (
    <div className="storeContainer h-100">
      <h2 className="storeTitle text-center p-2 mb-3">Store</h2>
      <div>
        <h4 className="storeTitle text-center p-2 mb-2">Upgrades</h4>
      </div>
      <div>
        <h4 className="storeTitle text-center p-2">Buildings</h4>
        <ListGroup>
          {buildings.map((b, i) => {
            return level > i * 2.5 ? (
              <Building
                key={b.title}
                cost={b.cost}
                cookies={cookies}
                icon={b.icon}
                index={i}
                title={b.title}
                quantity={b.quantity}
                handlePurchase={handlePurchase}
              />
            ) : null;
          })}
        </ListGroup>
      </div>
    </div>
  );
};

export default Store;
