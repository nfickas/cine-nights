import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

class UserInfo extends Component{

    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case true:
                return;
            default:
                return [
                    <Image style={{width: 200, height:200}}circle key="1" src={this.props.auth.picture}></Image>,
                    <h5 key="2">{this.props.auth.profileName}</h5>
                ];
        }
    }

    render(){
        return(
            <div className="center">
                {this.renderContent()}
            </div>

        );
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(UserInfo);