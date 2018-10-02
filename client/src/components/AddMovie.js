import React, { Component } from 'react';
import MovieList from './MovieList';
import { Jumbotron } from 'react-bootstrap';

class AddMovie extends Component {
    constructor(){
        super();
        this.state = {movies: []};
    }
    render(){
        return(
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div>
                        <Jumbotron>
                            <h3 style={{ textAlign: 'center' }}>Add Movies</h3>
                            <div className="search-container">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <input type="text" placeholder="Search By Title.." name="title"/>
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                        </Jumbotron>
                    </div>
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
        .then(data => {console.log(data); this.setState({movies: data})});
  }
}

export default AddMovie;