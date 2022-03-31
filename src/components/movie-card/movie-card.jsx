import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card">
        <Card.Header id="card-header">
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Header>

        <Card.Body id="card-body">
          <Card.Img
            variant="top"
            src={movie.ImageURL}
            crossOrigin="true"
            id="card-image"
          />
          <Card.Text id="card-text">{movie.Description}</Card.Text>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
};
