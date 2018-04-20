import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieList from './MovieList';


class Library extends Component {
    constructor(){
        super();
        this.state = {movies: []};
    }

    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case true:
                return;
            default:
                return [
                    <img key="1" src={this.props.auth.picture}></img>,
                    <h5 key="2">{this.props.auth.profileName}</h5>
                ];
        }
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
                {this.renderContent()}
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