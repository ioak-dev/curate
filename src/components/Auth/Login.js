import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';
import './Login.scss';
import Navigation from '../Navigation';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newuser: false
        }
    }

    login = () => {
        // Real check
        this.success();
    }

    logout = () => {
        this.props.removeAuth();
        this.props.cookies.remove('isAuth');
    }

    success = () => {
        this.props.addAuth({
            isAuth: true,
            firstname: 'Arun Kumar',
            lastname: 'Selvaraj'
        });
        this.props.cookies.set('isAuth', true);
        this.props.history.push("/");
    }

    toggle = () => {
        this.setState({
            newuser: !this.state.newuser
        });
    }

    render() {
        return (
            <>
                <Navigation />
                <div className="login boxed">
                    {this.props.authorization.isAuth && <button className="secondary" onClick={this.logout}>Logout</button>}
                    {!this.props.authorization.isAuth && <button className="primary block" onClick={this.login}>Login</button>}
                </div>
            </>
        );
    }
}

Login.propTypes = {
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(withCookies(Login));