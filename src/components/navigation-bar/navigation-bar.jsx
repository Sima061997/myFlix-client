/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import "./navigation-bar.scss";
import { logo } from "./logo";

export function NavigationBar(props) {
  // eslint-disable-next-line react/prop-types
  const { user } = props;
  // onLoggedOut function returns to the starting page
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  // isAuth function
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
    <Navbar className="nav-bar">
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
        <Nav style={{ maxHeight: "100px", paddingLeft: "1em" }} className="container-fluid">
          <Nav.Item className="me-auto bd-highlight">
            {isAuth() && (
              <Nav.Link md={3} href="/" style={{color: "white"}}>
                HOME
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="me-auto bd-highlight">
            {isAuth() && (
              <Nav.Link md={3} href={`/users/${user}`} style={{color: "white"}}>
                PROFILE
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="bd-highlight">
            {!isAuth() && (
              <Nav.Link md={3} href="/register" style={{ color: "white" }}>
                Sign up
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="bd-highlight">
            {!isAuth() && (
              <Nav.Link md={3} href="/" style={{ color: "white" }}>
                Login
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="bd-highlight ml-auto">
            {isAuth() && (
              <Nav.Link
                md={3}
                onClick={() => {
                  onLoggedOut();
                }}
                style={{ color: "white" }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
