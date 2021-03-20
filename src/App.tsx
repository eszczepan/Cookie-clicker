import React, { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import { statistics } from "data/statistics";
import { buildings } from "data/buildings";
import { cpsCounter } from "utils/cpsCounter";
import BigCookie from "assets/images/cookies/BigCookie.png";
import CookieCounter from "components/organisms/CookieCounter/CookieCounter";
import Store from "components/organisms/Store/Store";

const App: FC = () => {
  const [progress, setProgress] = useState(statistics);
  const [buildingProgress, setBuildingProgress] = useState(buildings);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevState) => ({
        ...prevState,
        cookies: prevState.cookies + prevState.cookiesPerSecond / 10,
        totalCookies: prevState.totalCookies + prevState.cookiesPerSecond / 10,
      }));
    }, 100);
    if (Math.round(progress.totalCookies) >= progress.nextLevel) {
      setProgress((prevState) => ({
        ...prevState,
        level: prevState.level + 1,
        nextLevel: prevState.nextLevel * 2,
      }));
    }
    return () => clearInterval(interval);
  }, [progress.totalCookies, progress.nextLevel]);

  const handleCookieClick = () =>
    setProgress((prevState) => ({
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
    setProgress((prevState) => ({
      ...prevState,
      cookies: prevState.cookies - cost,
      cookiesPerSecond: cpsCounter(updatedProgress),
    }));
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

      <Container fluid className="vh-100 px-0">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">
            <img
              alt="cookie-clicker-logo"
              src={BigCookie}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Cookie Clicker
          </Navbar.Brand>
          <Nav className="mr-auto">
            {/* <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Achievements</Nav.Link>
            <Nav.Link href="#">Statistics</Nav.Link> */}
          </Nav>
        </Navbar>

        <Row className="no-gutters" style={{ height: "calc(100% - 56px)" }}>
          <Col className="h-100">
            <CookieCounter
              totalCookies={Math.round(progress.totalCookies)}
              counter={Math.round(progress.cookies)}
              cps={progress.cookiesPerSecond}
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
              level={progress.level}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
