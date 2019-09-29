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

    profile: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, setProfile })(withCookies(withRouter(Navigation)));