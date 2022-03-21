import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return( 
      <Card className="movie-card">
        <Card.Header id="card-header">
        <Card.Title>{movie.Title}</Card.Title>
        </Card.Header>

        <Card.Body id="card-body">
        <Card.Img variant="top" src={movie.ImageURL} crossOrigin="true" id="card-image"/>
          <Card.Text id="card-text">{movie.Description}</Card.Text>
          </Card.Body>

          <Card.Footer id="card-footer">
          <Button id="button" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
          </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
