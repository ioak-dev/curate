import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';

class AuthInit extends Component {
    componentWillMount() {
        if (!this.props.authorization.isAuth && this.props.cookies.get('isAuth')) {
            this.props.addAuth({
                isAuth: true,
                firstname: 'Arun Kumar',
                lastname: 'Selvaraj'
            });
        }
        this.props.getAuth();
    }

    render() {
        return (
            <></>
        )
    }
}


AuthInit.propTypes = {
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(withCookies(AuthInit));