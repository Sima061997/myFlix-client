/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {combineReducers} from 'redux';
import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  GET_USERINFO,
  UPDATE_USERINFO,
  FAVORITE_MOVIES,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;

    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;

    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;

    default:
      return state;
  }
}

function userInfo(state = {}, action) {
  switch (action.type) {
    case GET_USERINFO:
      return action.value;

    default:
      return state;
  }
}

function updateInfo(state = {}, action) {
  switch (action.type) {
    case UPDATE_USERINFO:
      return action.value;

    default:
      return state;
  }
}

function FavoriteMovies(state = [], action) {
  switch (action.type) {
    case FAVORITE_MOVIES:
      return action.value;

    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  userInfo,
  updateInfo,
  FavoriteMovies,
});

export default moviesApp;
