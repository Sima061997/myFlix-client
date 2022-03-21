import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavigationBar } from '../navigation-bar/navigation-bar'

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
         movies : [],
          selectedMovie: null,
          newUser: null,
          user: null
        };
    }
    componentDidMount() {
      axios.get('https://secret-falls-20485.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

    onRegistration(newUser) { 
      this.setState({newUser}); 
    }
    
    onLoggedIn(user) {
        this.setState({user});
      }

    render() {
        const {movies, selectedMovie, newUser, user } = this.state;

        /* If there is no user, the RegistrationView and LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if(!newUser) return(
          <RegistrationView onRegistration={newUser => this.onRegistration(newUser)}/>
        );
          if (!user) return (
          <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
          );
        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view"></div>;

          /*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/ 

          return (
            <Row className="main-view justify-content-md-center">
            {(selectedMovie) ? (
              <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
            )
            : movies.map(movie => (
                <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                </Col>
              )) 
           }
            </Row>
          );    
        }
    
    }
    MainView.propTypes = {
    };
    