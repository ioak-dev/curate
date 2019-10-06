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
            menu: false
        }
    }

    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    signin = (type) => {
        this.props.login(type);
    }

    render() {
        return (
            <>
            <div className={(this.props.transparent ? "navbar mobile transparent" : "navbar mobile")}>
                <div className="left">
                    {!this.props.transparent && this.props.profile.theme === 'theme_light' && <img className="logo" src={curate_black} alt="Curate logo" />}
                    {(this.props.transparent || this.props.profile.theme === 'theme_dark') && <img className="logo" src={curate_white} alt="Curate logo" />}
                    {/* links */}
                </div>
                <div className="right">
                    {/* <div className="settings-icon" onClick={this.props.toggleSettings}><i className="material-icons">settings</i></div> */}
                    <div className={(this.state.menu ? "menu active" : "menu")} onClick={this.toggleMenu}><div></div></div>
                    {/* action login */}
                </div>
            </div>
            <div className={(this.state.menu ? "slider show" : "slider hide")} onClick={this.toggleMenu}>
                <div className={(this.state.menu ? "container": "container hidetext")} onClick={this.toggleMenu}>
                    <div className="action">
                        <div className="settings-icon" onClick={this.props.toggleSettings}>
                            {this.props.authorization.isAuth && <button className="default disabled small" onClick={this.props.toggleSettings}><i className="material-icons">brush</i>Appearance</button>}
                        </div>
                        <div className="buttons">
                            {this.props.authorization.isAuth && <button className="default disabled small" onClick={this.props.logout()}><i className="material-icons">power_settings_new</i>Logout</button>}
                            {!this.props.authorization.isAuth && <button className="secondary small left" onClick={() => this.signin('signin')}><i className="material-icons">person</i>Login</button>}
                            {!this.props.authorization.isAuth && <button className="secondary small right" onClick={() => this.signin('signup')}><i className="material-icons">person_add</i>Signup</button>}
                        </div>
                    </div>
                    <Links authorization={this.props.authorization}/>
                </div>
            </div>
            </>
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