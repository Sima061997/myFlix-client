/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'react-bootstrap';

import {setMovies, setUser} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import {NavigationBar} from '../navigation-bar/navigation-bar';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {MovieView} from '../movie-view/movie-view';
import {GenreView} from '../genre-view/genre-view';
import {DirectorView} from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';

import {bindActionCreators} from 'redux';
export class MainView extends React.Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    // eslint-disable-next-line react/prop-types
    const user = this.props.setUser(localStorage.getItem('user'));
    if (accessToken !== null && user !== null) {
      this.getMovies(accessToken);
    }
  }
  // this function gets movies from the API
  getMovies(token) {
    axios
        .get('https://secret-falls-20485.herokuapp.com/movies', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => {
          // eslint-disable-next-line react/prop-types
          this.props.setMovies(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  // this function authenticates the user from API and sets the user Name and token to localStorage
  onLoggedIn(authData) {
    // eslint-disable-next-line react/prop-types
    this.props.setUser(authData.user.Name);

    // sets the name and token of user on localStorage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Name);
    this.getMovies(authData.token);
  }

  render() {
    const {movies, user} = this.props;
    return (
      <Router>
        <NavigationBar user={user} />
        <Container className="m-5">
          <Row className="main-view justify-content-md-center h-100 ">
            <Route
              exact
              path="/"
              render={() => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                }
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (!user) {
                  return (
                    <Col lg={8} md={8}>
                      <RegistrationView
                        onRegistration={(newUser) =>
                          this.onRegistration(newUser)
                        }
                      />
                    </Col>
                  );
                }
              }}
            />

            <Route
              path="/movies/:id"
              render={({match, history}) => {
                if (!user) return null;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.id)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:Name"
              render={({match, history}) => {
                if (!user) return null;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <DirectorView
                      movies={movies}
                      director={
                        movies.find(
                            (m) => m.Director.Name === match.params.Name,
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:Name"
              render={({match, history}) => {
                if (!user) return null;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <GenreView
                      movies={movies}
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.Name)
                            .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({history}) => {
                if (!user) return null;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setMovies, setUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

MainView.propTypes = {
  user: PropTypes.string,
  movies: PropTypes.array.isRequired,
};
