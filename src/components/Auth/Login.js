import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';
import './Login.scss';
import Navigation from '../Navigation';
import { TextField } from '@material-ui/core';

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

    login = () => {
        // Real check
        this.success();
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
                <div className="login">
                    {!this.state.newuser && <div className="container">
                        <h1>Log In</h1>
                        <div className="form">
                            <TextField
                                id="outlined-uncontrolled"
                                label="Username"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Password"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.login}>Sign In</button>
                        <br /><br />
                        Don't have an account? &nbsp; <button className="secondary"  onClick={this.toggle}>Sign Up</button>
                    </div>}
                    
                    {this.state.newuser && <div className="container">
                        <h1>Sign Up</h1>
                        <div className="form">
                            <TextField
                                id="outlined-uncontrolled"
                                label="First name"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Last name"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Username"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Password"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Repeat Password"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Email"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.login}>Create account</button>
                        <br /><br />
                        Already have a account? &nbsp; <button className="secondary"  onClick={this.toggle}>Sign In</button>
                    </div>}
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