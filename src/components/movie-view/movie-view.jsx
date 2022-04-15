import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";
export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card className="movie-view">
        <Card.Header id="card-header">
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Img
          className="img-thumbnail"
            variant="top"
            src={movie.ImageURL}
            crossOrigin="true"
            id="card-image"
          ></Card.Img>
          <Card.Title>Description:</Card.Title>
          <Card.Text id="card-text">{movie.Description}</Card.Text>
          <p></p>

          <Card.Title className="movie-genre">Genre:  </Card.Title>
          <Card.Text className="value">{movie.Genre.Name}</Card.Text>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">More about Genre</Button>
            </Link>
          
          <Card.Title className="movie-director">Director: </Card.Title>
            <Card.Text className="value">{movie.Director.Name}</Card.Text>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">More about Director</Button>
            </Link>

          <Button
            type="back"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = { 
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }).isRequired
  }).isRequired 
};
