/* eslint-disable require-jsdoc */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Container, Form, Button, Card, CardGroup} from 'react-bootstrap';

import axios from 'axios';
import './login-view.scss';


// eslint-disable-next-line react/prop-types
export function LoginView({onLoggedIn}) {
  // useState method is called and assigned to destructured variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be  more than 2 letters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr('Password must be more than 5 characters');
      isReq = false;
    }
    return isReq;
  };

  // this function logins in an app on click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send a request to the server for authentication
      axios
          .post('https://secret-falls-20485.herokuapp.com/login', {
            Name: username,
            Password: password,
          })
          .then((response) => {
          // server responds with an acceptance of JWT issued
            const data = response.data;
            onLoggedIn(data);
          })
          .catch((e) => {
            console.log('no such user', e);
          });
    }
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
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
        </Card>
      </CardGroup>
    </Container>
  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
};
