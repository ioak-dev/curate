import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import './style.scss';
import Home from '../../components/Home';
import Posts from '../Posts';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Auth/Login';
import PrivateRoute from '../Auth/PrivateRoute';
import AuthInit from '../Auth/AuthInit';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <HashRouter>
              <AuthInit />
              <div className="body">
                <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/posts" component={Posts}/>
                </div>
              </div>
            </HashRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
