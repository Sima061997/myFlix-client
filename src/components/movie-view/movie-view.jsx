import React from 'react';
import PropTypes from 'prop-types';
export class MovieView extends React.Component {
 

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
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
         <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          
         </div>
         <div className="movie-director">
         <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <span className="value">{movie.Director.Bio}</span>
          <span className="value">{movie.Director.Birth}</span>
          </div>
          <button type="back" onClick={() => {
            onBackClick(null);}} >Back</button>
          </div>
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
