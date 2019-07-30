import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import './style.scss';
import Content from './content';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    );
  }
}

export default App;
