import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col
} from "react-bootstrap";

import axios from "axios";
import "./registration-view.scss";
import { LoginView } from "../login-view/login-view";

export function RegistrationView(props) {
  //useState method is called and assigned to destructured variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // useState method for called and assigned to for Error variables
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setemailErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be more than 2 letters");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 5) {
      setUsernameErr("Password must be more than 5 characters");
      isReq = false;
    }

    if (!email) {
      setemailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setemailErr("Invalid Email");
      isReq = false;
    }
    return isReq;
  };
  /* Sends a request to the server for authentication */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, dateOfBirth);

    const isReq = validate();
    if (isReq) {
      axios.post("https://secret-falls-20485.herokuapp.com/users", {
          Name: username,
          Password: password,
          Email: email,
          Birthday: dateOfBirth,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          props.onRegistration(data);
          //alert("Registration Successful, please login!");
          //the second argument "_self" is necessary so that the page will open in the current tab
          //window.open("", "_self");
        })
        .catch(response => {
          console.error(response);
          alert("unable to register");
        });
    }
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
              <Form>
              <h3>Please Register</h3>
              <p></p>
                <Form.Group controlId="formName" className="reg-form-inputs">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword" className="reg-form-inputs">
                  <Form.Label> Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group controlId="Email" className="reg-form-inputs">
                  <Form.Label>EmailAddress:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=" Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Form.Group controlId="updateBirthday">
                  <Form.Label> DateOfBirth:</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YY"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              <p></p>
                 <Link to="/login">sign in</Link> 
              </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
