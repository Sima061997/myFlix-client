import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import { MainView } from './components/main-view/main-view';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import { LoginView } from './components/login-view/login-view';

import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import './index.scss';

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Router>
        <NavigationBar/>
          <Routes>
          <Route path="/" element={<MainView/>}></Route>
          <Route path="/login" element={<LoginView/>}></Route>
          </Routes>
      </Router>
      </React.StrictMode>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

