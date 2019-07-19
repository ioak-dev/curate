import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';

import './style.scss';
import { NavLink } from 'react-router-dom';
import logo_white from '../../images/placeholder-white.svg';
import logo_black from '../../images/placeholder-black.svg';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            mobilemenu: 'hide'
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(e) {
        if (this.state.visible) {
            this.setState({
                visible: !this.state.visible
            });
        } else {
            this.setState({
                visible: !this.state.visible
            });
        }
        e.stopPropagation();
    }

    render() {
        return (
            <div className="nav">
                <div className={(this.props.transparent ? "navbar transparent" : "navbar")}>
                    <div className="logo"><img src={logo_white} alt="IOAK logo" /></div>
                    <div className="leftnav">
                        <NavLink to="/home" className="navitem" activeClassName="active">Home</NavLink>
                        {this.props.authorization.isAuth &&
                            <>
                            <NavLink to="/posts" className="navitem" activeClassName="active">Posts</NavLink>
                            </>
                        }
                    </div>
                    <div className="rightnav">
                        <div className="auth">
                            {this.props.authorization.isAuth && <div className="label">{this.props.authorization.firstname}</div>}
                            {!this.props.authorization.isAuth && <div className="label">Log In</div>}
                            <NavLink to="/login" className="navitem" activeClassName="active"><i className="material-icons">account_circle</i></NavLink>
                        </div>
                        <div className="mobilemenu" onMouseUp={this.toggleMenu}><i className="material-icons">menu</i></div>
                    </div>
                </div>
                        
                <div className="mobilenav">
                    <div className={(this.state.visible ? "slider show" : "slider hide")} onClick={this.toggleMenu}>
                        <div className={(this.state.visible ? "": "hidetext")} onClick={this.toggleMenu}>
                            <div className="header">
                                <div className="logo"><img src={logo_black} alt="IOAK logo" /></div>
                                                                    
                            <div className="authheader">
                                <NavLink to="/login" className="navitem" activeClassName="active"><i className="material-icons">account_circle</i></NavLink>
                            </div>
                            </div>
                            <hr />
                            <NavLink to="/home" className="navitem" activeClassName="active"><p><i className="material-icons">home</i>Home</p></NavLink><br />
                            {this.props.authorization.isAuth && 
                                <>
                                <NavLink to="/posts" className="navitem" activeClassName="active"><p><i className="material-icons">mail</i>Posts</p></NavLink><br />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Navigation.propTypes = {
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authorization: state.authorization
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(withCookies(Navigation));