import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import { getProfile, setProfile, reloadProfile } from '../../actions/ProfileActions';
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
            transparentNavBar: false,
            firstLoad: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event && nextProps.event.name === 'navbar-transparency') {
            this.setState({
                transparentNavBar: nextProps.event.signal
            })
        }
        if ((this.state.firstLoad && nextProps.authorization && nextProps.authorization.isAuth) || 
            (nextProps.event && nextProps.event.name === 'loggedin')) {
            this.props.reloadProfile(nextProps.authorization);
            this.setState({
                firstLoad: false
            })
        }
    }

    toggleDarkMode = () => {
        if (this.props.profile.theme === 'theme_dark') {
            this.props.setProfile({
                ...this.props.profile,
                theme: 'theme_light'
            })   
        } else  {
            this.props.setProfile({
                ...this.props.profile,
                theme: 'theme_dark'
            })   
        }
    }

    changeTextSize = (size) => {
        this.props.setProfile({
            ...this.props.profile,
            textSize: size
        })
    }

    changeThemeColor = (color) => {
        this.props.setProfile({
            ...this.props.profile,
            themeColor: color
        })
    }

    login = (type) => {
        this.props.history.push('/login?type=' + type);
    }

    toggleSettings = () => {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    render() {
        return (
            <div className="nav">
                <Desktop {...this.props} logout={this.props.logout} login={this.login} toggleSettings={this.toggleSettings} transparent={this.state.transparentNavBar} />
                <Mobile {...this.props} logout={this.props.logout} login={this.login} toggleSettings={this.toggleSettings} transparent={this.state.transparentNavBar} />

                <ArcDialog title="Appearance" visible={this.state.showSettings} toggleVisibility={this.toggleSettings}>
                    <div className="settings">
                        <div>Dark mode</div>
                        <div>
                            <Switch
                            checked={this.props.profile.theme === 'theme_dark'}
                            onChange={this.toggleDarkMode}
                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                        </div>
                        
                        <div>Text Size</div>
                        <div>
                            <div className={"text-size size-1 space-right-1 " + (this.props.profile.textSize === 'textsize_tiny' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_tiny')}>Az</div>
                            <div className={"text-size size-2 space-right-1 " + (this.props.profile.textSize === 'textsize_small' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_small')}>Az</div>
                            <div className={"text-size size-3 space-right-1 " + (this.props.profile.textSize === 'textsize_medium' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_medium')}>Az</div>
                            <div className={"text-size size-4 " + (this.props.profile.textSize === 'textsize_large' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_large')}>Az</div>
                        </div>

                        <div className="typography-5">Color Scheme</div>
                        <div>
                            <div className="theme-color color-1" onClick={() => this.changeThemeColor('themecolor_1')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_1' && 'check'}</i></div>
                            <div className="theme-color color-2" onClick={() => this.changeThemeColor('themecolor_2')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_2' && 'check'}</i></div>
                            <div className="theme-color color-3" onClick={() => this.changeThemeColor('themecolor_3')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_3' && 'check'}</i></div>
                            <div className="theme-color color-4" onClick={() => this.changeThemeColor('themecolor_4')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_4' && 'check'}</i></div>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="primary"  onClick={this.toggleSettings}>Close</button>
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
    reloadProfile: PropTypes.func.isRequired,

    profile: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, setProfile, reloadProfile })(withCookies(withRouter(Navigation)));