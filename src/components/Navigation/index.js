import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
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
        console.log(props);
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
                <Desktop {...this.props} logout={this.props.logout} login={() => this.login} toggleSettings={this.toggleSettings} transparent={this.state.transparentNavBar} />
                <Mobile {...this.props} logout={this.props.logout} login={() => this.login} toggleSettings={this.toggleSettings} transparent={this.state.transparentNavBar} />
                
                

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
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,

    profile: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, setProfile })(withCookies(withRouter(Navigation)));