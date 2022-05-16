/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

import './navigation-bar.scss';
import {logo} from './logo';

export function NavigationBar(props) {
  // eslint-disable-next-line react/prop-types
  const {user} = props;
  // onLoggedOut function returns to the starting page
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  // isAuth function
  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className="navi-bar">
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
        <Nav style={{maxHeight: '100px'}} className="container-fluid">

          <Nav.Item className="me-auto p-2 bd-highlight">
            {isAuth() && (
              <Nav.Link md={3} href="/">
              HOME
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="me-auto p-2 bd-highlight">
            {isAuth() && (
              <Nav.Link
                md={3}
                href={`/users/${user}`}
              >
              PROFILE
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="p-2 bd-highlight">
            {!isAuth() && (
              <Nav.Link md={3} href="/register" >
                Sign in
              </Nav.Link>
            )}
          </Nav.Item >

          <Nav.Item className="p-2 bd-highlight">
            {!isAuth() && (
              <Nav.Link md={3} href="/" >
                Login
              </Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item className="p-2 bd-highlight ml-auto">
            {isAuth() && (
              <Nav.Link
                md={3}
                onClick={() => {
                  onLoggedOut();
                }}
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
