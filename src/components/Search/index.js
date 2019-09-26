import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

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
