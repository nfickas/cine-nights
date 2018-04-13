import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Library extends Component {

    render(){
        return(
            <div className="App">
                <Link 
                        to="library/movies/new" 
                >
                Add Movie
                </Link>
            </div>
        );
    }
}

export default Library;