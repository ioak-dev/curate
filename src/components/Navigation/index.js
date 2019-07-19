import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';

import './style.scss';
import { NavLink } from 'react-router-dom';
import logo_white from '../../images/placeholder-white.svg';
import logo_white2 from '../../images/placeholder-white2.svg';
import logo_black2 from '../../images/placeholder-black2.svg';

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

    logout = () => {
        this.props.removeAuth();
        this.props.cookies.remove('isAuth');
    }

    render() {
        return (
            <div className="nav">
                <div className={(this.props.transparent ? "navbar transparent" : "navbar")}>
                    <div className="logo"><img src={logo_white2} alt="IOAK logo" /></div>
                    <div className="leftnav">
                        {/* <NavLink to="/home" className="navitem" activeClassName="active">Home</NavLink> */}
                        {this.props.authorization.isAuth &&
                            <>
                            <NavLink to="/bookmarks" className="navitem" activeClassName="active">Bookmarks</NavLink>
                            <NavLink to="/notes" className="navitem" activeClassName="active">Notes</NavLink>
                            </>
                        }
                    </div>
                    <div className="rightlogo">
                        <div className="logo"><img src={logo_white} alt="IOAK logo" /></div>
                    </div>
                    <div className="rightnav">
                        <div className="auth">
                            {this.props.authorization.isAuth && <div className="label">{this.props.authorization.firstname}</div>}
                            {!this.props.authorization.isAuth && <div className="label">Log In</div>}
                            {!this.props.authorization.isAuth && <NavLink to="/login" className="navitem" activeClassName="active"><i className="material-icons">fingerprint</i></NavLink>}
                            {this.props.authorization.isAuth && <button className="icon primary" onClick={this.logout}><i className="material-icons">power_settings_new</i></button>}
                        </div>
                        <div className="mobilemenu" onMouseUp={this.toggleMenu}><i className="material-icons">menu</i></div>
                    </div>
                </div>

                <div className="mobilenav">
                    <div className={(this.state.visible ? "slider show" : "slider hide")} onClick={this.toggleMenu}>
                        <div className={(this.state.visible ? "": "hidetext")} onClick={this.toggleMenu}>
                            <div className="header">
                                <div className="logo"><img src={logo_black2} alt="IOAK logo" /></div>
                                                                    
                            <div className="authheader">
                                    {this.props.authorization.isAuth && <div className="label">Log Out</div>}
                                    {!this.props.authorization.isAuth && <div className="label">Log In</div>}
                                    {!this.props.authorization.isAuth && <NavLink to="/login" className="navitem" activeClassName="active"><i className="material-icons">fingerprint</i></NavLink>}
                                    {this.props.authorization.isAuth && <button className="icon primary" onClick={this.logout}><i className="material-icons">power_settings_new</i></button>}
                            </div>
                            </div>
                            <hr />
                            {/* <NavLink to="/home" className="navitem" activeClassName="active"><p><i className="material-icons">home</i>Home</p></NavLink><br /> */}
                            {this.props.authorization.isAuth && 
                                <>
                                <NavLink to="/bookmarks" className="navitem" activeClassName="active"><p><i className="material-icons">bookmarks</i>Bookmarks</p></NavLink><br />
                                <NavLink to="/notes" className="navitem" activeClassName="active"><p><i className="material-icons">note</i>Notes</p></NavLink>
                                </>
                            }
                        </div>
                        <div className={(this.state.visible ? "mobilefooter": "hidetext")}>
                            {this.props.authorization.isAuth && 
                                <div>
                                    <i className="material-icons">account_circle</i>
                                    {this.props.authorization.firstname}
                                </div>
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