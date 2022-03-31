import React from 'react';
import { BrowserRouter as Router, Routes, Route,Redirect } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { UserUpdate } from '../user-update/user-update';

import './main-view.scss';
export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
         movies : [],
          user: null
        };
    }
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
    }
    
    
    onLoggedIn(authData) {
      console.log(authData);
        this.setState({
          user: authData.user.Name
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Name);
        this.getMovies(authData.token);
      }

      getMovies(token) {
        axios.get("https://secret-falls-20485.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
           // Assign the result to the state
           this.setState({
             movies: response.data
           });
        })
        .catch(function (error) {
         console.log(error);
        });
      }

    render() {
        const { movies, user } = this.state; 

          return (
            <Router>
  <NavigationBar user={user} />  
  <Container>
  <Row className="main-view justify-content-md-center">
    
  <Route exact path="/" render={() => {
    if (!user) return <Col>
    <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)}/>
    </Col>
    if (movies.length === 0) return <div className="main-view"/>;
    return movies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
        </Col>
        ))
  }}/>

  <Route path="/register" render={() => {
    if (!user)
    return <Col lg={8} md={8}>
      <RegistrationView />
    </Col>
  }} />

  <Route path="/movies/:id" render={({ match, history}) => {
    return <Col md={8}>
<MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
    </Col> 
  }} />

  <Route path="/directors/:Name" render={({match, history}) => {
    return <Col>
    <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
    </Col>
  }} />

  <Route path="/genres/:Name" render={({match, history}) => {
    return <Col>
    <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
    </Col>
  }} />
            </Row>
  </Container>          
            </Router>           
          );    
        }
    
    }

    MainView.propTypes = {
    };