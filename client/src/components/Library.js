import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Movie from './Movie';


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

    render(){
        return(
            <div className="App">
                {this.renderContent()}
                <Link 
                        to="library/movies/new" 
                >
                Add Movie
                </Link>
                <Movie movie={this.state.movies} search={false} />
            </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Library);