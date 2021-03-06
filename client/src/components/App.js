import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Library from './Library';
import AddMovie from './AddMovie';

class App extends Component{

    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return(
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/library" component={Library} />
                        <Route path="/library/movies/new" component={AddMovie} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);