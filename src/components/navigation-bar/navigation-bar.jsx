import React from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";

import "./navigation-bar.scss";
import { logo } from "./logo";

export function NavigationBar(props) {
  const { user } = props;
  //onLoggedOut function returns to the starting page
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  //isAuth function
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="#" className="image p-0 m-0">
        <img
          src={logo}
          alt="logo"
          id="logo-image"
          width="150px"
          height="90px"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav style={{ maxHeight: "100px" }} className="d-flex bd-highlight">
          {isAuth() && (
            <Nav.Link md={3} href="/" className="me-auto p-2 bd-highlight">
              HOME
            </Nav.Link>
          )}
          {isAuth() && (
            <Nav.Link
              md={3}
              href={`/users/${user}`}
              className="me-auto p-2 bd-highlight"
            >
              PROFILE
            </Nav.Link>
          )}

          {!isAuth() && (
            <Nav.Link md={3} href="/register" className="p-2 bd-highlight">
              {" "}
              Sign in
            </Nav.Link>
          )}
          {!isAuth() && (
            <Nav.Link md={3} href="/" className="p-2 bd-highlight">
              {" "}
              Login
            </Nav.Link>
          )}
          {isAuth() && (
            <Nav.Link md={3} href="/deregister" className="p-2 bd-highlight">
              {" "}
              Sign out
            </Nav.Link>
          )}
          {isAuth() && (
            <Nav.Link
              md={3}
              onClick={() => {
                onLoggedOut();
              }}
              className="float-end"
            >
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
