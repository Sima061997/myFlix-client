/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import React from 'react';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';

import {MovieCard} from '../movie-card/movie-card';
// eslint-disable-next-line max-len
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import './movies-list.scss';

const mapStateToProps = (state) => {
  const {visibilityFilter} = state;
  return {visibilityFilter};
};

function MoviesList(props) {
  // eslint-disable-next-line react/prop-types
  const {movies, visibilityFilter} = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    // eslint-disable-next-line react/prop-types
    filteredMovies = movies.filter((m) =>
      // eslint-disable-next-line react/prop-types
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()),
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{margin: '1em'}}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={6} lg={3} xl={3} xs={12} sm={12} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
