import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
    /**
    const moviesWithGenre = () => {
     if (genre.Name == movies.Genre.Name)
    }    
 */
    render() {
        const { genre, onBackClick } = this.props;
    return(
        <Container className="genre-view">
            
            <Card className="movie-genre">
            <span className="label">Name: </span>
          <span className="value">{genre.Name}</span> 
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span> 
<div>

</div>
          <Button type="back" onClick={() => {
            onBackClick(null);}} >Back</Button>      
         </Card>
            
        </Container>
        
    );
    }
}