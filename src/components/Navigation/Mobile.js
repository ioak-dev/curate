import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { NavLink } from 'react-router-dom';
import ioak_white from '../../images/ioak_white.svg';
import ioak_black from '../../images/ioak_black.svg';
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
                    <Links authorization={this.props.authorization}/>
                    <div className="action">
                        <div className="settings-icon" onClick={this.props.toggleSettings}>
                            <button onClick={this.props.toggleSettings}>Change Theme</button>
                        </div>
                        <div className="buttons">
                            {this.props.authorization.isAuth && <button className="primary" onClick={this.props.logout()}>Logout</button>}
                            {!this.props.authorization.isAuth && <button onClick={this.props.logout()}>Login</button>}
                            {!this.props.authorization.isAuth && <button className="secondary block" onClick={this.props.logout()}>Signup</button>}
                        </div>
                    </div>
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

const mapStateToProps = state => ({
    authorization: state.authorization,
    profile: state.profile
})

export default Desktop;