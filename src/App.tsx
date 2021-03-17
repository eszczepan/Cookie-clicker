import React, { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import CookieCounter from "components/organisms/CookieCounter/CookieCounter";
import Store from "components/organisms/Store/Store";
import BigCookie from "assets/images/cookies/BigCookie.png";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

const App: FC = () => {
  const [cookieCounter, setCookieCounter] = useState(0);
  const [cps, setCps] = useState(2.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookieCounter((prevState) => prevState + cps / 100);
    }, 10);
    return () => clearInterval(interval);
  }, [cps]);

  const handleCookieClick = () =>
    setCookieCounter((prevState) => Math.round(prevState + 1));

  return (
    <>
      {/*TODO*/}
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {Math.round(cookieCounter).toString()} cookies | Cookie Clicker
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
              counter={Math.round(cookieCounter)}
              setCounter={handleCookieClick}
              cps={cps}
            />
          </Col>
          <Col className="h-100">
            <Store />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
