import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import './style.scss';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from '../Home';
import BookmarkController from '../Bookmarks/BookmarkController';
import NoteController from '../Notes/NoteController';
import Login from '../Auth/Login';
import PrivateRoute from '../Auth/PrivateRoute';
import AuthInit from '../Auth/AuthInit';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { getProfile } from '../../actions/ProfileActions';

import Backdrop from './Backdrop';
import Notification from '../Notification';
import Navigation from '../Navigation';
import Settings from '../Settings';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import ResetPassword from '../Auth/ResetPassword';

const themes = {
  themecolor1: getTheme('#69A7BF'),
  themecolor2: getTheme('#99587B'),
  themecolor3: getTheme('#A66C26'),
  themecolor4: getTheme('#37AE82'),
};

function getTheme(color) {
  return createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: color,
      },
    },
  });
}

interface Props {
  getProfile: Function;
  setProfile: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  cookies: any;
  history: any;

  // event: PropTypes.object,
  profile: any;
  authorization: Authorization;
}

const Content = (props: Props) => {
  useEffect(() => {
    props.getProfile();
    props.getAuth();
  }, []);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'session expired') {
        logout(null, 'failure', 'Session expired. Login again');
      }
    });
    return () => eventBus.unsubscribe();
  });

  const logout = (
    event,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    props.removeAuth();
    props.cookies.remove('isAuth');
    props.cookies.remove('token');
    props.cookies.remove('secret');
    props.cookies.remove('name');
    sendMessage('notification', true, {
      type,
      message,
      duration: 3000,
    });
    sendMessage('loggedout', true);
  };

  return (
    <div
      className={`App ${props.profile.theme} ${props.profile.textSize} ${props.profile.themeColor}`}
    >
      <HashRouter>
        <AuthInit />
        <Backdrop />
        <div className="body">
          <div className="body-content">
            <Notification />
            <MuiThemeProvider theme={themes[props.profile.themeColor]}>
              <Navigation {...props} logout={() => logout} />
              <Route
                exact
                path="/"
                render={propsLocal => (
                  <Home {...props} {...propsLocal} logout={() => logout} />
                )}
              />
              <Route
                path="/home"
                render={propsLocal => (
                  <Home {...props} {...propsLocal} logout={() => logout} />
                )}
              />
              <Route
                path="/login"
                render={propsLocal => (
                  <Login {...props} {...propsLocal} logout={() => logout} />
                )}
              />
              <Route
                path="/reset"
                render={propsLocal => (
                  <ResetPassword
                    {...props}
                    {...propsLocal}
                    logout={() => logout}
                  />
                )}
              />
              <PrivateRoute
                path="/bookmarks"
                render={propsLocal => (
                  <BookmarkController
                    {...props}
                    {...propsLocal}
                    logout={logout}
                  />
                )}
              />
              <PrivateRoute
                path="/notes"
                render={propsLocal => (
                  <NoteController
                    {...props}
                    {...propsLocal}
                    logout={() => logout}
                  />
                )}
              />
              <Route
                path="/settings"
                render={propsLocal => (
                  <Settings {...props} {...propsLocal} logout={() => logout} />
                )}
              />
            </MuiThemeProvider>
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getAuth,
  addAuth,
  removeAuth,
  getProfile,
})(withCookies(Content));
