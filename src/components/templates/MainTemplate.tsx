import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import BigCookie from "assets/images/cookies/BigCookie.png";

type Props = {
  children: React.ReactElement;
};

const MainTemplate = ({ children }: Props) => {
  return (
    <Container fluid className="vh-100 px-0">
      <Navbar
        className="d-flex justify-content-between"
        bg="dark"
        variant="dark"
        collapseOnSelect
        expand="sm"
      >
        <Navbar.Brand href="/">
          <img
            alt="cookie-clicker-logo"
            src={BigCookie}
            width="30"
            height="30"
            className="d-inline-block align-center ml-1"
          />{" "}
          Cookie Clicker
        </Navbar.Brand>
        <Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/achievements">
              Achievements
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics">
              Statistics
            </Nav.Link>
          </Navbar.Collapse>
        </Nav>
      </Navbar>
      {children}
    </Container>
  );
};

export default MainTemplate;
