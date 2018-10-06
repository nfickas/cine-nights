import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';



class Movie extends Component {

    constructor(){
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

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
            return <Button onClick={this.addMovie.bind(this)} className="btn-floating halfway-fab waves-effect waves-light green"><span className='glyphicon glyphicon-plus-sign' style={{color: 'green'}}/></Button>;
        }
        return;
    }

    renderDeleteButton(){
        if(this.props.delete){
            return <Button onClick={this.deleteMovie.bind(this)} className="btn-floating halfway-fab waves-effect waves-light red"><span className='glyphicon glyphicon-minus-sign' style={{color: 'red'}}/></Button>;
        }
        return;
    }

    render(){
        return(

                <div className="panel panel-primary">
                    <div className="panel-heading" style={{ height: 50, textAlign: 'center' }}>{this.props.movie.Title}</div>
                    <div className="panel-body" style={{backgroundColor: '#EEEEEE'}}><img src={this.props.movie.Poster} className="img-responsive" style={{ width: '100%', height: 400 }} alt="Poster"></img></div>
                    <div className="panel-footer"><div style={{display: 'flex', justifyContent: 'space-between'}}>{this.props.movie.Year} <div style={{justifyContent: 'space-evenly'}}>{this.renderAddButton()} {this.renderDeleteButton()}
                        <Button bsSize="medium" onClick={this.handleShow}><span className='glyphicon glyphicon-option-horizontal'></span></Button></div></div></div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.movie.Title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>More Info Feature to Come Soon!</h4>
                            <p>Year: {this.props.movie.Year}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Movie);