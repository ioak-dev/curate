import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';
import './Login.scss';
import Navigation from '../Navigation';
import ArcTextField from '../Ux/ArcTextField';
import { signup, signin } from './AuthService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newuser: false
        }
    }

    componentDidMount() {
        // this.props.cookies.remove('q');
        // console.log(this.props.cookies.get('q'));
    }

    signin = () => {
        const that = this;
        this.props.removeNotification();
        this.props.startSpinner();
        if (this.state.username && this.state.password) {
            signin({
                username: this.state.username,
                password: this.state.password
                })
                .then(function(response) {
                    console.log(response);
                    if (response.status === 200) {
                        that.props.addNotification('success', 'Signed In successfully', 3000);
                        that.success(response.data);
                    } else if (response.status === 404) {
                        that.props.addNotification('failure', 'User name does not exist', 3000);
                    } else if (response.status === 401) {
                        that.props.addNotification('failure', 'Incorrect passphrase', 3000);
                    } else {
                        that.props.addNotification('failure', 'Unknown response from server. Please try again or at a later time', 3000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    that.props.addNotification('failure', 'Unknown error. Please try again or at a later time', 3000);
                })
        } else {
            this.props.addNotification('failure', 'Username/password cannot be empty', 3000);
        }
    }

    signup = () => {
        const that = this;
        this.props.removeNotification();
        this.props.startSpinner();
        signup({
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            email: this.state.email
            })
            .then(function(status) {
                if (status === 200) {
                    that.props.addNotification('success', 'Your account has been created. You can login now', 3000);
                    that.toggle();
                }
            })
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
            firstname: data.firstname,
            lastname: data.lastname
        });
        this.props.cookies.set('isAuth', true);
        this.props.cookies.set('token', data.token);
        this.props.cookies.set('secret', data.secret);
        this.props.cookies.set('firstname', data.firstname);
        this.props.cookies.set('lastname', data.lastname);
        this.props.history.push("/bookmarks");
    }

    toggle = () => {
        this.setState({
            newuser: !this.state.newuser
        });
    }

    render() {
        return (
            <>
                <div className="login">
                <div className="nav-trans"><Navigation transparent /></div>
                <div className="nav-block"><Navigation /></div>
                    {!this.state.newuser && <div className="container">
                        <h1>Log In</h1>
                        <div className="form">
                            <ArcTextField label="Username" id="username" handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Password" id="password" type="password" handleChange={e => this.handleChange(e)} />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.signin}>Sign In</button>
                        <br /><br />
                        Don't have an account? &nbsp; <button className="secondary"  onClick={this.toggle}>Sign Up</button>
                    </div>}
                    
                    {this.state.newuser && <div className="container">
                        <h1>Sign Up</h1>
                        <div className="form">
                            <ArcTextField label="First name" id="firstname" handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Last name" id="lastname" handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Username" id="username" handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Password" id="password" type="password" handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Email" id="email" handleChange={e => this.handleChange(e)} />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.signup}>Create account</button>
                        <br /><br />
                        Already have a account? &nbsp; <button className="secondary"  onClick={this.toggle}>Sign In</button>
                    </div>}
                </div>
            </>
        );
    }
}

Login.propTypes = {
    startSpinner: PropTypes.func.isRequired,
    stopSpinner: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,

    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(withCookies(Login));