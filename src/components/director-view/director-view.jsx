import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;
    return(
        <Container className="genre-view">
            
            <Card className="movie-genre">
            <span className="label">Name: </span>
          <span className="value">{director.Name}</span> 
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
          <span className="label">Birth: </span>
          <span className="value">{director.Birth}</span>

          <Button type="back" onClick={() => {
            onBackClick(null);}} >Back</Button>             
         </Card>
            
        </Container>
        
    );
    }
}