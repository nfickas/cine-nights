import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {

  renderList() {
    return (this.props.movies).map(movie => <Movie key={movie.imdbID} movie={movie} search={this.props.search} />);
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

export default MovieList;