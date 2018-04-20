import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Movie extends Component {
    addMovie(){
        const data = JSON.stringify({
                "imdbID": this.props.movie.imdbID,
                "Title": this.props.movie.Title,
                "Year": this.props.movie.Year,
                "Poster": this.props.movie.Poster
        });
        fetch('/api/movies', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(res => console.log(res));
    }

    renderAddButton(){
        if(this.props.search){
            return <Link to='/library' onClick={this.addMovie.bind(this)} className="btn-floating halfway-fab waves-effect waves-light green"><i className="material-icons">add</i></Link>;
        }
        return;
    }
    render(){
        return(
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={this.props.movie.Poster} />
                            {this.renderAddButton()}
                        </div>
                        <div className="card-content">
                            <span className="card-title">{this.props.movie.Title}</span>
                            <p>{this.props.movie.Year}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Movie);