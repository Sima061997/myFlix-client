import React from "react";
import PropTypes from "prop-types";
import {Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export class UpdateUser extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,
      Password: null,
      Email: null,
      Birthday: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.updateUser(accessToken);
    }
  }

  updateUser = (token) => {
    const Name = localStorage.getItem("user");
    axios.put(`https://secret-falls-20485.herokuapp.com/users/${Name}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((e) => {
      this.setState({
        Name: response.data.Name,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      if(Name !== this.setState.Name){
        localStorage.setItem("user", this.setState.Name);
      }
    }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

render() {
  return (
    <Container id="profile-view-pv" className="d-flex align-items-center">
         <Row className="mt-5">
      <Col md={12}>
          <Form>
              <h3>Update the User Details</h3>
              <p></p>
      <Form.Group controlId="userName">
          <Form.Label>Name: </Form.Label>
          <Form.Control
              type="text"
              placeholder={Name}
              
            />
            </Form.Group>

            <Form.Group controlId="userPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
              type="text"
              placeholder={Password}
              
            />
            </Form.Group>

            <Form.Group controlId="userEmail">
          <Form.Label>Email Address: </Form.Label>
          <Form.Control
              type="Email"
              placeholder={Email}
              
            />
            </Form.Group>

            <Form.Group controlId="userBirthday">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
              type="text"
              placeholder="DD-MM-YY"
              
            />
            </Form.Group>

          <Button onClick={this.updateUser}>Submit</Button>

          <Button onClick={() => { this.props.onBackClick(null) }}> Back </Button>

      </Form>
      </Col>
      </Row>
    </Container>
  );
}
}

