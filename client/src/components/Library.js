import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import UserInfo from './UserInfo';
import { Jumbotron } from 'react-bootstrap';


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
            <div className='library'>
                <Jumbotron>
                    <UserInfo />
                    <br />
                    <br />
                    <div className='buttons' style={{ textAlign: 'center' }}>
                        <Link 
                                to="library/movies/new"
                        >
                        <button type="button" className="btn btn-success">Add Movies</button>
                        </Link>
                    </div>
                </Jumbotron>
                <MovieList delete={true} search={false} movies={this.state.movies} />
            </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Library);