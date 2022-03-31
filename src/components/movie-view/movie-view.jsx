import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

import './movie-view.scss';
export class MovieView extends React.Component {
 
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view">
        <div className="movie-poster">
          <img src= {movie.ImageURL} alt= "image" crossOrigin="true" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
          </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

         <div className="movie-genre">
         <p></p>
         <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span> 
          <Link to={`/genres/${movie.Genre.Name}`}>
  <Button variant="link">More about Genre</Button>
</Link>     
         </div>
         
         <div className="movie-director">
           <p></p>
         <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
  <Button variant="link">More about Director</Button>
</Link>

          </div>
        
          <Button type="back" onClick={() => {
            onBackClick(null);}} >Back</Button>
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

