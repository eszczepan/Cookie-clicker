import React, { FC } from "react";
import "./Store.css";

import Building from "components/molecules/Building/Building";

const Store: FC = () => {
  return (
    <div className="storeContainer h-100">
      <h2 className="storeTitle text-center p-2 mb-3">Store</h2>
      <div>
        <h4 className="storeTitle text-center p-2 mb-2">Upgrades</h4>
      </div>
      <div>
        <h4 className="storeTitle text-center p-2">Buildings</h4>
        <Building icon="CursorIcon" />
        <Building icon="GrandmaIcon" />
        <Building icon="FarmIcon" />
        <Building icon="MineIcon" />
        <Building icon="FactoryIcon" />
        <Building icon="BankIcon" />
        <Building icon="TempleIcon" />
        <Building icon="WizardTowerIcon" />
        <Building icon="ShipmentIcon" />
        <Building icon="AlchemyLabIcon" />
      </div>
    </div>
  );
};

export default Store;
