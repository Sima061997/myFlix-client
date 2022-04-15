import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export function DirectorView(props) {
  
    const { movies, director, onBackClick } = props;
    return (
      <Container className="genre-view">
        <Card className="movie-genre">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
          <span className="label">Birth: </span>
          <span className="value">{director.Birth}</span>
          <span className="label">Movies in the list from Director: {director.Name} </span>
          <Row className="justify-content-md-center">
                {movies.filter(m => m.Director.Name === director.Name).map(m => (
                    <Col xs={12} sm={6} md={4} className="d-flex" key={m._id}>
                        <MovieCard movie={m} />
                    </Col>
                ))}
            </Row>
          <Button
            type="back"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card>
      </Container>
    );
  }

  DirectorView.propTypes = {
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
      
    }),
  };