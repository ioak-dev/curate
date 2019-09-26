import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import curate_white from '../../images/curate_white.svg';
import curate_black from '../../images/curate_black.svg';
import Links from './Links';

class Desktop extends Component {
    constructor(props) {
        super(props);
        this.props.getProfile();
        this.state = {
            showSettings: false
        }
    }

    render() {
        return (
            <div className={(this.props.transparent ? "navbar desktop transparent" : "navbar desktop")}>
                <div className="left">
                    {!this.props.transparent && this.props.profile.theme === 'theme_light' && <img className="logo" src={curate_black} alt="Curate logo" />}
                    {(this.props.transparent || this.props.profile.theme === 'theme_dark') && <img className="logo" src={curate_white} alt="Curate logo" />}
                    <Links authorization={this.props.authorization}/>
                </div>
                <div className="right">
                    <div className="action">
                        {/* <button className="default disabled small" onClick={this.props.toggleSettings}><i className="material-icons">palette</i>Theme</button> */}
                        {this.props.authorization.isAuth && 
                            <button className="default disabled small" onClick={this.props.toggleSettings}><i className="material-icons">brush</i>Theme</button>}
                        {this.props.authorization.isAuth && 
                            <button className="default disabled small" onClick={this.props.logout()}><i className="material-icons">power_settings_new</i>Logout</button>}
                        {!this.props.authorization.isAuth && 
                            <button className="default disabled small" onClick={this.props.login()}><i className="material-icons">person</i>Login</button>}
                        {!this.props.authorization.isAuth && 
                            <button className="default disabled small" onClick={this.props.login()}><i className="material-icons">person_add</i>Signup</button>}
                    </div>
                </div>
            </div>
        );
    }
}

Desktop.propTypes = {
    sendEvent: PropTypes.func.isRequired,
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,

    profile: PropTypes.object.isRequired

}

export default Desktop;