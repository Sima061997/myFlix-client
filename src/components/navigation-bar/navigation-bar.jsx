import React from "react";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import "./navigation-bar.scss";
import { logo } from "./logo";

export class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="primary" expand="lg" >
        <Container className="d-flex">
          <Navbar.Brand href="#"className="pl-2">
            <img src={logo} alt="logo" id="logo-image" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav  
              className="mr-auto p-2"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#home">HOME</Nav.Link>
              <Nav.Link href="#popular">POPULAR</Nav.Link>
              <NavDropdown title="COLLECTIONS" id="navbarScrollingDropdown">
                <NavDropdown.Header>GENRE</NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action1"> Biographical romantic drama</NavDropdown.Item>
                <NavDropdown.Item href="#action2"> Historical drama</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Fantasy</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Animation</NavDropdown.Item>
                <NavDropdown.Item href="#action5">Science Fiction</NavDropdown.Item>
                <NavDropdown.Item href="#action6">Comedy drama</NavDropdown.Item>
                <NavDropdown.Item href="#action7">Drama</NavDropdown.Item>
                <NavDropdown.Item href="#action8">Psychological thriller</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action9">Something else here</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            <Form className="d-flex p-2" >
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="p-2"
              />
              <Button variant="outline-dark" bg="secondary" className="p-2 m-1" id="button">Search</Button>
            </Form>
          </Navbar.Collapse>
          <Button variant="outline-dark" bg="info" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        </Container>
      </Navbar>
    );
  }
}
