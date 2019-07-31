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
import { addNotification, removeNotification, startSpinner, stopSpinner } from '../../actions/NotificationActions';
import { getProfile } from '../../actions/ProfileActions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const arcTheme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
          main: '#F19F4D'          
      },
      secondary: {
          main: '#1B998B'
      }
    }
  });

class Content extends Component {
    constructor(props) {
        super(props);
        this.props.getProfile();
    }

    render() {
        return (
            <div className={"App " + this.props.profile.theme}>
                <HashRouter>
                    <AuthInit />
                    <div className="body">
                        <div className="content">
                            <MuiThemeProvider theme={arcTheme}>
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
    startSpinner: PropTypes.func.isRequired,
    stopSpinner: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,

    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { addNotification, removeNotification, startSpinner, stopSpinner, getProfile })(Content);
