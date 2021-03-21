import React, { FC } from "react";

import "./Store.css";
import { Button, ListGroup } from "react-bootstrap";
import { IBuilding } from "typings/models";
import Building from "components/molecules/Building/Building";

interface IProps {
  buildings: IBuilding[];
  cookies: number;
  handlePurchase(cost: number, index: number): void;
  handleResetProgress(): void;
  level: number;
}

const Store: FC<IProps> = ({
  buildings,
  cookies,
  handlePurchase,
  handleResetProgress,
  level,
}) => {
  return (
    <div className="storeContainer h-100">
      <div className="d-flex justify-content-end">
        <Button onClick={handleResetProgress}>Reset Progress</Button>
      </div>
      <h2 className="text-center p-2 mb-3">Store</h2>
      {/* <div>
        <h4 className="storeTitle text-center p-2 mb-2">Upgrades</h4>
      </div> */}
      <div>
        <h4 className="storeTitle text-center p-2">Buildings</h4>
        <ListGroup>
          {buildings.map((b, i) => {
            return level > i * 2.5 ? (
              <Building
                key={b.title}
                cost={b.cost}
                cps={b.cps}
                cookies={cookies}
                description={b.description}
                icon={b.icon}
                icon64={b.icon64}
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
