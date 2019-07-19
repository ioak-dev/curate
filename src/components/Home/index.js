import React from 'react';
import Navigation from '../Navigation';
import './style.scss';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <div className="home boxed">
            <div className="section1">
              <h3>React Boilerplate</h3>
              <p>Very thin boilerplate with just the essentials</p>
            </div>
        </div>
      </>
    );
  }
}