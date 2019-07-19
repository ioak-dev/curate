import React from 'react';
import Navigation from '../Navigation';
import { NavLink } from 'react-router-dom';
import './style.scss';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <div className="home">
          <div className="container">
            {/* <div className="section1">
              <h3>A bookmarking app like never before</h3>
              <p>Take your link to the web wherever you go, with the most secure bookmark and note taking app</p>
              <br />
              <p><NavLink to="/login" className="navitem" activeClassName="active">Sign up</NavLink>&nbsp;for free</p>
            </div>
            <div className="section2">
              <h3>Secure by design</h3>
              <p>Designed with security as a primary factor from ground up</p>
              <p>Your passwords never leaves your workstation</p>
              <p>Our servers have zero knowledge about your password</p>
            </div>
            <div className="section3">
              <h3>Premium features</h3>
              <p>Get premium features free for lifetime. We standby free software for all</p>
            </div>
            <div className="section4">
              <h3>Don't mix up personal and business</h3>
              <p>With the help of workspaces, you can now work in isolated containers</p>
            </div>
            <div className="section5">
              <h3>We love open source</h3>
              <p>Our codebase is 100% available for the community to do peer review and audit for any security flaws</p>
            </div>
            <div className="section6">
              <h3>Clean clutter free interface</h3>
              <p>Modern interface with a clutter free design to keep you in focus on your activity</p>
            </div>
            <div className="section7">
              <h3>Tip of the iceberg</h3>
              <p>We are evolving for the future. More features on the way. You can watch our roadmap here</p>
            </div>
            <div className="section8">
              <h3>Are you ready? Put your seat belts on</h3>
              <p><NavLink to="/login" className="navitem" activeClassName="active">Sign up</NavLink>&nbsp;for free</p>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}