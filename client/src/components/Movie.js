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
        .catch(err => alert('This movie could not be added.'));
    }

    deleteMovie(){
        fetch('/api/movies/'+this.props.movie.imdbID, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(res => {alert(`${this.props.movie.Title} was deleted from your library.`); window.location.reload(true);})
        .catch(err => alert('Something went wrong.'));
    }

    renderAddButton(){
        if(this.props.search){
            return <button onClick={this.addMovie.bind(this)} className="btn-floating halfway-fab waves-effect waves-light green"><i className="material-icons">check_circle</i></button>;
        }
        return;
    }

    renderDeleteButton(){
        if(this.props.delete){
            return <button onClick={this.deleteMovie.bind(this)} className="btn-floating halfway-fab waves-effect waves-light green"><i className="material-icons">remove_circle</i></button>;
        }
        return;
    }

    render(){
        return(

                <div className="panel panel-primary">
                    <div className="panel-heading" style={{ height: 50, textAlign: 'center' }}>{this.props.movie.Title}</div>
                    <div className="panel-body"><img src={this.props.movie.Poster} className="img-responsive" style={{ width: '100%', height: 350 }} alt="Poster"></img></div>
                    <div className="panel-footer"><div style={{display: 'flex', justifyContent: 'space-between'}}>{this.props.movie.Year} <div style={{justifyContent: 'space-evenly'}}>{this.renderAddButton()} {this.renderDeleteButton()}</div></div></div>
                </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Movie);