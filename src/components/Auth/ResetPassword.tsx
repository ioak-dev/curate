import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import './Login.scss';
import ArcTextField from '../Ux/ArcTextField';
import { signup, signin } from './AuthService';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';

const queryString = require('query-string');

interface Props {
    history: any,
    location: any
}

interface State {
    password: string;
    repeatPassword: string;
}

class ResetPassword extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            repeatPassword: ''
        }
    }

    componentDidMount() {
        // if (this.props.location.search) {
        //     const query = queryString.parse(this.props.location.search);
        //     console.log(query.code);
        //     if (!query.code) {
        //         alert(query.code);
        //         this.props.history.push("/home");
        //     }
        // }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    }

    changePassword = (event) => {
        event.preventDefault();
        alert(this.state.password);
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <form method="GET" onSubmit={this.changePassword} noValidate>
                        <h1>Reset password</h1>
                        <div className="form">
                        <ArcTextField label="Password" id="password" type="password" data={this.state} handleChange={e => this.handleChange(e)} />
                            <ArcTextField label="Repeat Password" id="repeatPassword" type="password" data={this.state} handleChange={e => this.handleChange(e)} />
                        </div>
                        <br />
                        <button className="primary block"  onClick={this.changePassword}>Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(ResetPassword);
