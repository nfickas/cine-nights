import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/facebook"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>;
            default:
                return <li><a href="/api/logout"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to={this.props.auth ? '/library':'/'}>
                            Cine Nights
                        </Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a>Home</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Header);