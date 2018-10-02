import React, { Component } from 'react';
import Movie from './Movie';

class MovieRow extends Component {
    renderRow() {
        return (this.props.movies).map(movie => 
            <div key={movie.imdbID} className="col-sm-4">
                <Movie key={movie.imdbID} movie={movie} search={this.props.search} />
            </div>
        );
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderRow()}
                </div>
            </div>
        );
    }
}

export default MovieRow;