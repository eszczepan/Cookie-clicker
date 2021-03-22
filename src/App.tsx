import React, { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "react-bootstrap";

import { statistics } from "data/statistics";
import { buildings } from "data/buildings";
import { cpsCounter } from "utils/cpsCounter";
import { IBuilding, IStatistics } from "typings/models";

import MainTemplate from "components/templates/MainTemplate";
import CookieCounter from "components/organisms/CookieCounter/CookieCounter";
import Store from "components/organisms/Store/Store";

const App: FC = () => {
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("Progress")!) || statistics
  );
  const [buildingProgress, setBuildingProgress] = useState(
    JSON.parse(localStorage.getItem("Buildings")!) || buildings
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevState: IStatistics) => ({
        ...prevState,
        cookies: prevState.cookies + prevState.cookiesPerSecond / 10,
        totalCookies: prevState.totalCookies + prevState.cookiesPerSecond / 10,
      }));
      localStorage.setItem("Progress", JSON.stringify(progress));
      localStorage.setItem("Buildings", JSON.stringify(buildingProgress));
    }, 100);
    if (Math.round(progress.totalCookies) >= progress.nextLevel) {
      setProgress((prevState: IStatistics) => ({
        ...prevState,
        level: prevState.level + 1,
        nextLevel: prevState.nextLevel * 2,
      }));
    }
    return () => clearInterval(interval);
  }, [progress, buildingProgress]);

  const handleCookieClick = () =>
    setProgress((prevState: IStatistics) => ({
      ...prevState,
      cookies: prevState.cookies + 1,
      totalCookies: prevState.totalCookies + 1,
      cookieClicks: prevState.cookieClicks + 1,
    }));

  const handleBuildingPurchase = (cost: number, index: number) => {
    const updatedProgress = [...buildingProgress].map((el, i) => {
      const { quantity } = el;
      return i === index
        ? {
            ...el,
            quantity: quantity + 1,
            cost: Math.round(cost * 1.15),
          }
        : el;
    });
    setBuildingProgress(updatedProgress);
    setProgress((prevState: IStatistics) => ({
      ...prevState,
      cookies: prevState.cookies - cost,
      cookiesPerSecond: cpsCounter(updatedProgress),
      buildings: prevState.buildings + 1,
    }));
  };

  const handleResetProgress = () => {
    setBuildingProgress((prevState: IStatistics) => buildings);
    setProgress((prevState: IBuilding) => statistics);
  };

  return (
    <>
      {/*TODO*/}
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {Math.round(progress.cookies).toString()} cookies | Cookie Clicker
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/*TODO*/}

      <MainTemplate>
        <Row className="no-gutters" style={{ height: "calc(100% - 51.44px)" }}>
          <Col className="h-100">
            <CookieCounter
              totalCookies={Math.round(progress.totalCookies)}
              counter={Math.round(progress.cookies)}
              cps={
                Math.round((progress.cookiesPerSecond + Number.EPSILON) * 100) /
                100
              }
              level={progress.level}
              setCounter={handleCookieClick}
              nextLevel={progress.nextLevel}
            />
          </Col>
          <Col className="h-100">
            <Store
              buildings={buildingProgress}
              cookies={progress.cookies}
              handlePurchase={handleBuildingPurchase}
              handleResetProgress={handleResetProgress}
              level={progress.level}
            />
          </Col>
        </Row>
      </MainTemplate>
    </>
  );
};

export default App;
