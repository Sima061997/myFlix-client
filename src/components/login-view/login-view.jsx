import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Form, Button, Card, CardGroup } from "react-bootstrap";

import axios from "axios";
import "./login-view.scss";
export function LoginView(props) {
  console.log(props);
  //useState method is called and assigned to destructured variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Send a request to the server for authentication */
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, password);
   /* Send a request to the server for authentication */
     axios.post("https://secret-falls-20485.herokuapp.com/login", {
       Name: username,
       Password: password
     })
     .then(response => {
       const data = response.data;
       console.log(data);
       props.onLoggedIn(data);
     })
     .catch(e => {
       console.log("no such user", e);
     })
  };
  
  return (
    <Container>
    <CardGroup>
    <Card id="login">
      <Card.Header>Please Login</Card.Header>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Card>
    </CardGroup>
    </Container>
  );
}

LoginView.propTypes = {
  user:  PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
