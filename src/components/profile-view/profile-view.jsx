import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";
import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Name: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUserInfo(accessToken);
    }
  }

  getUserInfo = (token) => {
    // console.log("getuserInfo Updated");
    const Name = localStorage.getItem("user");
    axios
      .get(`https://secret-falls-20485.herokuapp.com/users/${Name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeregister = () => {
    const Name = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://secret-falls-20485.herokuapp.com/users/${Name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        alert("User deleted from the App");
        localStorage.clear();
        window.open("/", "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateUserInfo = (e) => {
    e.preventDefault();
    const Name = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .put(
        `https://secret-falls-20485.herokuapp.com/users/${Name}`,
        {
          Name: this.state.Name,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Saved Changes");
        console.log(response.data);
        this.setState({
          Name: response.data.updatedUser.Name,
          Password: response.data.updatedUser.Password,
          Email: response.data.updatedUser.Email,
          Birthday: response.data.updatedUser.Birthday,
        });
        localStorage.setItem("user", response.data.updatedUser.Name);
        window.open(`/users/${response.data.updatedUser.Name}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  removeFavoriteMovies = (_id) => {
    const Name = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://secret-falls-20485.herokuapp.com/users/${Name}/movies/${_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("movie from fav List deleted");
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // console.log("ProfileView rendered");
    const { Name, Password, Email, Birthday, FavoriteMovies } = this.state;
    const { movies, onBackClick } = this.props;

    return (
      <Container id="profile-view-pv" className="d-flex align-items-center">
        <Row className="mt-5">
          <Col md={12}>
            <Card id="profile">
              <Card.Body id="card-body-pv">
                <Card.Title id="username-pv">Name: </Card.Title>
                <Card.Text className="value">{Name}</Card.Text>

                <Card.Title id="password-dv">Password: </Card.Title>
                <Card.Text className="value">{Password}</Card.Text>

                <Card.Title id="email-dv">E-mail: </Card.Title>
                <Card.Text className="value">{Email}</Card.Text>

                <Card.Title id="birth-year-dv">Birthday: </Card.Title>
                <Card.Text className="value">{Birthday}</Card.Text>

                <Card.Title id="favoritemovies-dv">FavoriteMovies: </Card.Title>
                <div>
                  {FavoriteMovies.length === 0 && (
                    <div className="text-center">No Favorite Movies Yet</div>
                  )}
                  <Card id="favoritemovies-dv">
                    {FavoriteMovies.length > 0 &&
                      movies.map((movie) => {
                        if (
                          movie._id ===
                          FavoriteMovies.find(
                            (favMovie) => favMovie === movie._id
                          )
                        ) {
                          return (
                            <div key={movie._id}>
                              <img src={movie.ImageURL} crossOrigin="true" />
                              <Link to={`/movies/${movie._id}`}>
                                <h4>{movie.Title}</h4>
                              </Link>

                              <Button
                                onClick={this.removeFavoriteMovies(movie._id)}
                              >
                                Remove Movie
                              </Button>
                              <p></p>
                            </div>
                          );
                        }
                      })}
                  </Card>
                </div>
                  <Form>                   
                    <h3>Update the User Details</h3>
                    <p></p>
                    <Form.Group controlId="userName">
                      <Form.Label>Name: </Form.Label>
                      <Form.Control type="text" placeholder={Name} />
                    </Form.Group>

                    <Form.Group controlId="userPassword">
                      <Form.Label>Password: </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group controlId="userEmail">
                      <Form.Label>Email Address: </Form.Label>
                      <Form.Control type="Email" placeholder={Email} />
                    </Form.Group>

                    <Form.Group controlId="userBirthday">
                      <Form.Label>Birthday: </Form.Label>
                      <Form.Control type="text" placeholder="DD-MM-YY" />
                    </Form.Group>
                    <Button onClick={this.updateUserInfo}> Submit </Button>
                  </Form>
                  </Card.Body>
                  <Card.Footer>
                  <Button onClick={this.onDeregister}>Delete Account</Button>
                    <Button
                      type="back"
                      onClick={() => {
                        onBackClick(null);
                      }}
                    >
                      Back
                    </Button>
                  </Card.Footer>
                </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }),
};
