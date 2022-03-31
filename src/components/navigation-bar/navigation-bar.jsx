import React from "react";

import {
  Navbar,
  Container,
  Nav
} from "react-bootstrap";

import "./navigation-bar.scss";
import { logo } from "./logo";
export function NavigationBar ({user}) {

  const onLoggedOut = () => {   
    localStorage.clear();
    window.open("/", "_self"); 
  }

  const isAuth = () => {
    if(typeof window == "undefined"){
      return false;
    }
    if(localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }
        
    return (
      <Navbar bg="primary" expand="lg">
        <Container className="d-flex">
          <Navbar.Brand href="#" className="pl-2">
            <img src={logo} alt="logo" id="logo-image" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" /> 
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto p-2"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link md={3} href="#home">HOME</Nav.Link>
              <Nav.Link md={3} href="#popular">Profile</Nav.Link>
              { !isAuth() && (
            <Nav.Link  md={3} href={`/user/${user}`} >{user}</Nav.Link>
            )}
              { !isAuth() && (
            <Nav.Link  md={3} href="/register" > Signup</Nav.Link>
            )}
            { !isAuth() && (
            <Nav.Link  md={3} href="/" > Login</Nav.Link>
            )}
            { isAuth() && (
              <Nav.Link md={3}  onClick={() => {onLoggedOut() }}>Logout</Nav.Link>
              )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
