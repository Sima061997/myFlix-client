/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Figure,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// eslint-disable-next-line max-len
import {
  getUserInfo,
  updateUserInfo,
  favoriteMovies,
} from '../../actions/actions';

import './profile-view.scss';
import axios from 'axios';
import {connect} from 'react-redux';
class ProfileView extends React.Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.userDetails(accessToken);
    }
  }

  // gives the Details about the user from API
  userDetails = () => {
    const token = localStorage.getItem('token');
    const Name = localStorage.getItem('user');
    axios
        .get(`https://secret-falls-20485.herokuapp.com/users/${Name}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => {
          console.log(response.data);
          this.props.getUserInfo(response.data);
          this.props.favoriteMovies(response.data.FavoriteMovies);
        })
        .catch(function(error) {
          console.log(error);
        });
  };
  // deletes an account of the user from App
  onDeregister = () => {
    const Name = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
        .delete(`https://secret-falls-20485.herokuapp.com/users/${Name}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then((e) => {
          alert('User deleted from the App');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  // updates the details of the user
  updateUserInfo = () => {
    const Name = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const {updateInfo} = this.props;
    axios
        .put(
            `https://secret-falls-20485.herokuapp.com/users/${Name}`,
            {
              Name: updateInfo.Name,
              Password: updateInfo.Password,
              Email: updateInfo.Email,
              Birthday: updateInfo.Birthday,
            },
            {
              headers: {Authorization: `Bearer ${token}`},
            },
        )
        .then((response) => {
          alert('Save Changes');
          console.log(response.data);
          this.props.updateUserInfo(response.data);

          const updatedName = response.data.updatedUser.Name;
          localStorage.setItem('user', updatedName);
          window.open(`/users/${updatedName}`, '_self');
        })
        .catch(function(error) {
          console.log(error);
        });
  };

  // sets the new user Name given by user
  setName(value) {
    this.props.updateInfo.Name = value;
  }
  // sets the new Password given by user
  setPassword(value) {
    this.props.updateInfo.Password = value;
  }
  // sets the new Email given by user
  setEmail(value) {
    this.props.updateInfo.Email = value;
  }
  // sets the new Birthday given by user
  setBirthday(value) {
    this.props.updateInfo.Birthday = value;
  }

  // removes the movie from the favorite movies list of the user
  removeFavoriteMovies = (_id) => {
    const Name = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
        .delete(
            `https://secret-falls-20485.herokuapp.com/users/${Name}/movies/${_id}`,
            {headers: {Authorization: `Bearer ${token}`}},
        )
        .then((e) => {
          alert(' movie removed from user\'s favorite List');
          window.open(`/users/${Name}`, '_self');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  render() {
    const {movies, userInfo, FavoriteMovies, onBackClick} = this.props;

    return (
      <Container id="profile-view-pv">
        <Row>
          <Col md={6}>
            <Card id="profile">
              <h3>User Profile </h3>
              <Card.Body id="card-body-pv">
                <Card.Title id="username-pv">Name: </Card.Title>
                <Card.Text className="value">{userInfo.Name}</Card.Text>

                <Card.Title id="email-dv">E-mail: </Card.Title>
                <Card.Text className="value">{userInfo.Email}</Card.Text>

                <Card.Title id="birth-year-dv">Birthday: </Card.Title>
                <Card.Text className="value">{userInfo.Birthday}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Form>
              <h3>Update Profile</h3>
              <p></p>
              <Form.Group controlId="userName">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => this.setName(e.target.value)}
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="userPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => this.setPassword(e.target.value)}
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="userEmail">
                <Form.Label>Email Address: </Form.Label>
                <Form.Control
                  type="Email"
                  onChange={(e) => this.setEmail(e.target.value)}
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="userBirthday">
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => this.setBirthday(e.target.value)}
                  placeholder="DD-MM-YY"
                />
              </Form.Group>
              <Button onClick={this.updateUserInfo} className="m-1">
                {' '}
                Submit{' '}
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <h4>FavoriteMovies: </h4>
          </Col>
        </Row>
        <Row>
          {FavoriteMovies.length === 0 && (
            <div className="text-center">No Favorite Movies Yet</div>
          )}
          {FavoriteMovies.length > 0 &&
            movies.map((movie) => {
              if (
                movie._id ===
                FavoriteMovies.find((favMovie) => favMovie === movie._id)
              ) {
                return (
                  <Col
                    className="fav-movies"
                    xs={12}
                    md={6}
                    lg={3}
                    key={movie._id}
                  >
                    <Figure>
                      <Figure.Image src={movie.ImageURL} crossOrigin="true" />

                      <Figure.Caption>
                        <Link to={`/movies/${movie._id}`}>
                          <h6>{movie.Title}</h6>
                        </Link>
                      </Figure.Caption>
                    </Figure>

                    <Button
                      variant="secondary"
                      onClick={(e) => this.removeFavoriteMovies(movie._id)}
                    >
                      Remove Movie
                    </Button>
                  </Col>
                );
              }
            })}
        </Row>

        <Row>
          <Button className="mr-1" onClick={this.onDeregister}>
            Delete Account
          </Button>
          <Button
            type="back"
            className="ml-1"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    updateInfo: state.updateInfo,
    FavoriteMovies: state.FavoriteMovies,
  };
};

export default connect(mapStateToProps, {
  getUserInfo,
  updateUserInfo,
  favoriteMovies,
})(ProfileView);

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }),
};
