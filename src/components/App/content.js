import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './style.scss';
import Home from '../../components/Home';
import Bookmarks from '../Bookmarks';
import Notes from '../Notes';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Auth/Login';
import PrivateRoute from '../Auth/PrivateRoute';
import AuthInit from '../Auth/AuthInit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receiveEvents, sendEvent } from '../../actions/EventActions';
import { getProfile } from '../../actions/ProfileActions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Backdrop from './Backdrop';
import Notification from '../Notification';
import Navigation from '../Navigation';

const arcTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
          main: '#D9AD29'          
      },
      secondary: {
          main: '#9AA66D'
      }
    }
  });

class Content extends Component {
    constructor(props) {
        super(props);
        this.props.receiveEvents();
        this.props.getProfile();
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
                                <Navigation {...this.props} />
                                <Route exact path="/" render={(props) => <Home {...props} {...this.props}/>} />
                                <Route path="/home" render={(props) => <Home {...props} {...this.props}/>} />
                                <Route path="/login" render={(props) => <Login {...props} {...this.props}/>} />
                                <PrivateRoute path="/bookmarks" render={(props) => <Bookmarks {...props} {...this.props}/>}/>
                                <PrivateRoute path="/notes" render={(props) => <Notes {...props} {...this.props}/>} />
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

    event: PropTypes.object,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  event: state.event
})

export default connect(mapStateToProps, { receiveEvents, sendEvent, getProfile })(Content);
