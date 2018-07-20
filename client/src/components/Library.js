import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import UserInfo from './UserInfo';


class Library extends Component {
    constructor(){
        super();
        this.state = {movies: []};
    }

    componentDidMount(){
        this.fetchMovies();
    }
    async fetchMovies(){
        const movie = await fetch('/api/library/movies', {
            credentials: 'include'
        });
        const data = await movie.json();
        this.setState({movies: data});
            
    }

    render(){
        return(
            <div className="App">
                <UserInfo />
                <Link 
                        to="library/movies/new"
                >
                Add Movie
                </Link>
                <MovieList search={false} movies={this.state.movies} />
            </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Library);