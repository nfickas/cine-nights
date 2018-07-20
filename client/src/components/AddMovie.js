import React, { Component } from 'react';
import MovieList from './MovieList';

class AddMovie extends Component {
    constructor(){
        super();
        this.state = {movies: []};
    }
    render(){
        return(
           <div>
                <h3>Add Movie</h3>
                <div className="search-container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" placeholder="Search By Title.." name="title"/>
                        <button type="submit">Search</button>
                    </form>
                </div>
                <br></br>
                <MovieList search={true} movies={this.state.movies}/>
           </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let title = data.get('title');
        fetch('/api/movies/'+title, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => this.setState({movies: data}));
  }
}

export default AddMovie;