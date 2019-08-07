import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { getProfile, setProfile } from '../../actions/ProfileActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';

import './style.scss';
import Desktop from './Desktop';
import Mobile from './Mobile';
import { Switch } from '@material-ui/core';
import ArcDialog from '../Ux/ArcDialog';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.props.getProfile();
        this.state = {
            visible: false,
            mobilemenu: 'hide',
            chooseTheme: false,
            showSettings: false,
            transparentNavBar: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event && nextProps.event.name === 'navbar-transparency') {
            this.setState({
                transparentNavBar: nextProps.event.signal
            })
        }
    }

    toggleDarkMode = () => {
        if (this.props.profile.theme === 'theme_dark') {
            this.props.setProfile({
                theme: 'theme_light'
            })   
        } else  {
            this.props.setProfile({
                theme: 'theme_dark'
            })   
        }
    }

    toggleTextSize = () => {
        console.log('not available');
    }

    logout = () => {
        this.props.removeAuth();
        this.props.cookies.remove('isAuth');
        this.props.cookies.remove('token');
        this.props.cookies.remove('secret');
        this.props.cookies.remove('firstname');
        this.props.cookies.remove('lastname');
        this.props.sendEvent('notification', true, {type: 'success', message: 'You have been logged out', duration: 3000});
    }

    login = () => {
        this.props.history.push('/login');
    }

    toggleSettings = () => {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    render() {
        return (
            <div className="nav">
                <Desktop {...this.props} logout={() => this.logout} login={() => this.login} toggleSettings={this.toggleSettings} transparent={this.state.transparentNavBar} />
                <Mobile {...this.props} logout={() => this.logout} login={() => this.login} toggleSettings={this.toggleSettings} transparent={this.state.transparentNavBar} />
                
                

                <ArcDialog title="Settings" visible={this.state.showSettings} toggleVisibility={this.toggleSettings}>
                    <div className="settings">
                        <div>Dark mode</div>
                        <div>
                            <Switch
                            checked={this.props.profile.theme === 'theme_dark'}
                            onChange={this.toggleDarkMode}
                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                        </div>
                        
                        <div>Large Text</div>
                        <div>
                            <Switch
                            checked={this.props.profile.theme === 'theme_dark2'}
                            onChange={this.toggleTextSize}
                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="primary animate in right"  onClick={this.toggleSettings}>Close</button>
                    </div>
                </ArcDialog>
            </div>
        );
    }
}

Navigation.propTypes = {
    sendEvent: PropTypes.func.isRequired,
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,

    profile: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    authorization: state.authorization,
    profile: state.profile
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth, getProfile, setProfile })(withCookies(withRouter(Navigation)));