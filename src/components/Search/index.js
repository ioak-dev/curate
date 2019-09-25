import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.scss';
import developers1 from '../../images/developers1.jpg';
import developers2 from '../../images/developers2.jpg';

export default class Search extends React.Component {
  componentWillMount() {
    this.props.sendEvent('navbar-transparency');
  }

  componentWillUnmount() {
    this.props.sendEvent('navbar-transparency', false);
  }

  render() {
    return (
      <>
        <div className="home">
          search landing page
        </div>
      </>
    );
  }
}

Search.propTypes = {
  sendEvent: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}
