import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import './Login.scss';
import ArcTextField from '../Ux/ArcTextField';
import { signup, signin } from './AuthService';
const queryString = require('query-string');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newuser: false,
            name: '',
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        if (this.props.location.search) {
            const query = queryString.parse(this.props.location.search);
            if (query && query.type === 'signup') {
                this.setState({
                    newuser: true
                })
            }
        }
    }

    signin = (event) => {
        event.preventDefault();

        this.props.sendEvent('notification', false);
        this.props.sendEvent('spinner');
        if (this.state.email && this.state.password) {
            signin({
                email: this.state.email,
                password: this.state.password
                })
                .then((response) => {
                    if (response.status === 200) {
                        this.props.sendEvent('notification', true, {message: 'Signed In successfully', type: 'success', duration: 3000});
                        this.success(response.data);
                    } else if (response.status === 404) {
                        this.props.sendEvent('notification', true, {message: 'User name does not exist', type: 'failure', duration: 3000});
                    } else if (response.status === 401) {
                        this.props.sendEvent('notification', true, {message: 'Incorrect passphrase', type: 'failure', duration: 3000});
                    } else {
                        this.props.sendEvent('notification', true, {message: 'Unknown response from server. Please try again or at a later time', type: 'failure', duration: 3000});
                    }
                })
                .catch((error) => {
                    this.props.sendEvent('notification', true, {'type': 'failure', message: 'Unknown error. Please try again or at a later time', duration: 3000});
                })
        } else {
            this.props.sendEvent('notification', true, {type: 'failure', message: 'Username/password cannot be empty', duration: 3000});
        }
    }

    signup = (event) => {
        event.preventDefault();
        const that = this;
        this.props.sendEvent('notification', false);
        this.props.sendEvent('spinner');
        if (this.state.name && this.state.password && this.state.email) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
                this.props.sendEvent('notification', true, {type: 'failure', message: 'Email ID is invalid', duration: 3000});
                return;
            }
            signup({
                name: this.state.name,
                password: this.state.password,
                email: this.state.email
                })
                .then(function(status) {
                    if (status === 200) {
                        that.props.sendEvent('notification', true, {'type': 'success', message: 'Your account has been created. You can login now', duration: 3000});
                        that.toggle();
                    }
                })
        } else if (!this.state.name) {
            this.props.sendEvent('notification', true, {type: 'failure', message: 'Name cannot be empty', duration: 3000});
        } else if (!this.state.email) {
            this.props.sendEvent('notification', true, {type: 'failure', message: 'Email cannot be empty', duration: 3000});
        } else if (!this.state.password) {
            this.props.sendEvent('notification', true, {type: 'failure', message: 'Password cannot be empty', duration: 3000});
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    }

    success = (data) => {
        this.props.addAuth({
            isAuth: true,
            token: data.token,
            secret: data.secret,
            name: data.name
        });
        this.props.sendEvent('loggedin', true);
        this.props.cookies.set('isAuth', true);
        this.props.cookies.set('token', data.token);
        this.props.cookies.set('secret', data.secret);
        this.props.cookies.set('name', data.name);
        this.props.cookies.set('email', data.email);
        this.props.history.push("/bookmarks");
        // this.props.history.push("/notes");
    }

    toggle = () => {
        this.setState({
            newuser: !this.state.newuser
        });
    }

    render() {
        return (
            <div className="login">
                {!this.state.newuser && <div className="container">
                    <form method="GET" onSubmit={this.signin} noValidate>
                        <h1>Log In</h1>
                        <div className="form">
                            <ArcTextField label="Username/e-mail" id="email" data={this.state} handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Password" id="password" type="password" data={this.state} handleChange={e => this.handleChange(e)} />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.signin}>Sign In</button>
                        <br /><br />
                        Don't have an account? &nbsp; <button className="secondary"  onClick={this.toggle}>Sign Up</button>
                    </form>
                </div>}

                {this.state.newuser && <div className="container">
                    <form method="GET" onSubmit={this.signup} noValidate>
                        <h1>Sign Up</h1>
                        <div className="form">
                            <ArcTextField label="Name" id="name" data={this.state} handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Email / User Name" id="email" data={this.state} handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Password" id="password" type="password" data={this.state} handleChange={e => this.handleChange(e)} />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.signup}>Create account</button>
                        <br /><br />
                        Already have a account? &nbsp; <button className="secondary"  onClick={this.toggle}>Sign In</button>
                    </form>
                </div>}
            </div>
        );
    }
}

Login.propTypes = {
    sendEvent: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,

    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(withCookies(Login));
