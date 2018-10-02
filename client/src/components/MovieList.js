import React, { Component } from 'react';
import MovieRow from './MovieRow';

class MovieList extends Component {
  renderList() {
    if(typeof(this.props.movies) !== 'undefined' && (this.props.movies).length !== 0){
      let moviesArrays = [];
      let currArray = [];
      for(let i = 0; i < (this.props.movies).length; i += 1) {
        currArray.push(this.props.movies[i]);
        if ((i + 1) % 3 === 0){
          moviesArrays.push(currArray);
          currArray = [];
        }
        else if((i+1) === (this.props.movies).length){
          moviesArrays.push(currArray);
        }
      }
      return moviesArrays.map((movieArray) => <MovieRow key={moviesArrays.indexOf(movieArray)} search={this.props.search} movies={movieArray} />);
    }
  }

  render() {
    return (
        <div className="movieList">
          {this.renderList()}
        </div>
    );
  }
}

export default MovieList;