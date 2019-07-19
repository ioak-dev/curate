import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  componentWillMount() {
    this.props.getAuth();
  }

  render() {
    return (
      <>
        {this.props.authorization.isAuth && <Route path={this.props.path} component={this.props.component} />}
        {!this.props.authorization.isAuth && <Redirect to={{pathname: "/home"}} />}
      </>
    );
  }
}

PrivateRoute.propTypes = {
  getAuth: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth })(PrivateRoute);