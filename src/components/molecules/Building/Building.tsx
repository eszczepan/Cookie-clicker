import React, { FC } from "react";

interface IProps {
  icon: string;
}

const Building: FC<IProps> = ({ icon }) => {
  return (
    <>
      <li className="d-flex my-2">
        <img
          src={require(`../../../assets/icons/${icon}.png`).default}
          alt=""
          style={{ maxWidth: "30%" }}
        />
        <div>
          <p>Grandma</p>
          <p>100</p>
        </div>
        <p>2</p>
      </li>
    </>
  );
};

export default Building;
