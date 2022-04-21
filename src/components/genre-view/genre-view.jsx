import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export class GenreView extends React.Component {
  render() {
    const {movies, genre, onBackClick } = this.props;
    return (
      <Container className="genre-view">
        <Card className="movie-genre">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
          <span className="label">Movies to Genre: {genre.Name}</span>
          <p></p>
          <Row className="justify-content-md-center">
                {movies.filter(m => m.Genre.Name === genre.Name).map(m => (
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
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    
  }),
};