/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const GET_USERINFO = 'GET_USERINFO';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const FAVORITE_MOVIES = 'FAVORITE_MOVIES';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value,
  };
}

export function getUserInfo(value) {
  return {
    type: GET_USERINFO,
    value,
  };
}

export function updateUserInfo(value) {
  return {
    type: UPDATE_USERINFO,
    value,
  };
}

export function favoriteMovies(value) {
  return {
    type: FAVORITE_MOVIES,
    value,
  };
}
