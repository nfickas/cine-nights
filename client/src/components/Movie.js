import React, { Component } from 'react';
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
        .then(res => alert(`${this.props.movie.Title} was added to your library!`))
        .catch(res => alert('This movie could not be added.'));
    }

    renderAddButton(){
        if(this.props.search){
            return <button onClick={this.addMovie.bind(this)} className="btn-floating halfway-fab waves-effect waves-light green"><i className="material-icons">check_circle</i></button>;
        }
        return;
    }
    render(){
        return(
                <div className="panel panel-primary">
                    <div className="panel-heading">{this.props.movie.Title}</div>
                    <div className="panel-body"><img src={this.props.movie.Poster} className="img-responsive" style={{ width: '100%' }} alt="Poster"></img></div>
                    <div className="panel-footer">{this.props.movie.Year} {this.renderAddButton()}</div>
                </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Movie);