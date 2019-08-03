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
                    <div className="settings-icon" onClick={this.props.toggleSettings}><i className="material-icons">settings</i></div>
                    <div className="action">
                        <button onClick={this.props.logout()}>Login</button>
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

const mapStateToProps = state => ({
    authorization: state.authorization,
    profile: state.profile
})

export default Desktop;