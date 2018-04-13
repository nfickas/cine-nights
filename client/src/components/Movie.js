import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
    render(){
        return(
            <div>
                <h4>{this.props.movie.Title}</h4>
                <Link to={"/api/library/add/"+this.props.movie.imdbID}><img src={this.props.movie.Poster} /></Link>
            </div>
        );
    }
}

export default Movie;