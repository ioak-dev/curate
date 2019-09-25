import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './style.scss';
import Home from '../Home';
import Bookmarks from '../Bookmarks';
import Notes from '../Notes';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Auth/Login';
import PrivateRoute from '../Auth/PrivateRoute';
import AuthInit from '../Auth/AuthInit';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { receiveEvents, sendEvent } from '../../actions/EventActions';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { getProfile } from '../../actions/ProfileActions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Backdrop from './Backdrop';
import Notification from '../Notification';
import Navigation from '../Navigation';
import Search from '../Search';

const arcTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
          main: '#64CFEA'          
      },
      secondary: {
          main: '#F49670'
      }
    }
  });

class Content extends Component {
    constructor(props) {
        super(props);
        this.props.receiveEvents();
        this.props.getProfile();
        this.props.getAuth();
    }
    
    logout = (event, type = 'success', message = 'You have been logged out') => {
        this.props.removeAuth();
        this.props.cookies.remove('isAuth');
        this.props.cookies.remove('token');
        this.props.cookies.remove('secret');
        this.props.cookies.remove('name');
        this.props.sendEvent('notification', true, {type: type, message: message, duration: 3000});
    }

    render() {
        return (
            <div className={"App " + this.props.profile.theme}>
                
                <HashRouter>
                    <AuthInit />
                    <Backdrop sendEvent={this.props.sendEvent} event={this.props.event} />
                    <div className="body">
                        <div className="content">
                            <Notification sendEvent={this.props.sendEvent} event={this.props.event} />
                            <MuiThemeProvider theme={arcTheme}>
                                <Navigation {...this.props} logout={() => this.logout}/>
                                <Route exact path="/" render={(props) => <Home {...props} {...this.props} logout={() => this.logout}/>} />
                                <Route path="/home" render={(props) => <Home {...props} {...this.props} logout={() => this.logout}/>} />
                                <Route path="/login" render={(props) => <Login {...props} {...this.props} logout={() => this.logout}/>} />
                                <PrivateRoute path="/bookmarks" render={(props) => <Bookmarks {...props} {...this.props} logout={this.logout} />} />
                                <PrivateRoute path="/notes" render={(props) => <Notes {...props} {...this.props} logout={() => this.logout} />} />
                                <Route path="/search" render={(props) => <Search {...props} {...this.props} logout={() => this.logout}/>} />
                            </MuiThemeProvider>
                        </div>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

Content.propTypes = {
    receiveEvents: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,

    event: PropTypes.object,
    profile: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  authorization: state.authorization,
  profile: state.profile,
  event: state.event
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth, receiveEvents, sendEvent, getProfile })(withCookies(Content));
