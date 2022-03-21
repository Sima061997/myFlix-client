import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Card, Row, Col, CardGroup } from "react-bootstrap";

export function RegistrationView(props) {
  //useState method is called and assigned to destructured variables

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  /* Sends a request to the server for authentication */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, dateOfBirth);
    /*onRegistration called from main-view  */
    props.onRegistration(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Header>Please Register</Card.Header>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label> Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>EmailAddress:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label> DateOfBirth:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DD/MM/YY"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
