import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { addNotification } from '../../actions/NotificationActions';
import { getProfile } from '../../actions/ProfileActions';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';
import Notification from '../Notification';

import './style.scss';
import { NavLink } from 'react-router-dom';
import ioak_white from '../../images/ioak_white.svg';
import ioak_black from '../../images/ioak_black.svg';
import curate_white from '../../images/curate_white.svg';
import curate_black from '../../images/curate_black.svg';
import account_circle from '../../images/account_circle.svg';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.props.getProfile();
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
        this.props.cookies.remove('token');
        this.props.cookies.remove('secret');
        this.props.cookies.remove('firstname');
        this.props.cookies.remove('lastname');
        this.props.addNotification('success', 'You have been logged out', 3000);
    }

    render() {
        return (
            <div className="nav">
                <div className={(this.props.transparent ? "navbar transparent" : "navbar")}>
                    {!this.props.transparent && this.props.profile.theme === 'theme_light' && <div className="logo"><img src={curate_black} alt="Curate logo" /></div>}
                    {(this.props.transparent || this.props.profile.theme === 'theme_dark') && <div className="logo"><img src={curate_white} alt="Curate logo" /></div>}
                    <div className="leftnav">
                        {/* <NavLink to="/home" className="navitem" activeClassName="active">Home</NavLink> */}
                        {this.props.authorization.isAuth &&
                            <>
                            <NavLink to="/bookmarks" className="navitem" activeClassName="active">Bookmarks</NavLink>
                            <NavLink to="/notes" className="navitem" activeClassName="active">Notes</NavLink>
                            <NavLink to="/settings" className="navitem" activeClassName="active">Settings</NavLink>
                            <NavLink to="/help" className="navitem" activeClassName="active">Help</NavLink>
                            </>
                        }
                    </div>
                    <div className="rightlogo">
                        {!this.props.transparent && this.props.profile.theme === 'theme_light' && <div className="logo"><img src={ioak_black} alt="IOAK logo" /></div>}
                        {(this.props.transparent || this.props.profile.theme === 'theme_dark') && <div className="logo"><img src={ioak_white} alt="IOAK logo" /></div>}
                    </div>
                    <div className="rightnav">
                        <div className="auth">
                            {this.props.authorization.isAuth && <div className="label">{this.props.authorization.firstname}</div>}
                            {!this.props.authorization.isAuth && <div className="label">Log In</div>}
                            {/* {!this.props.authorization.isAuth && <NavLink to="/login" className="navitem" activeClassName="active"><i className="material-icons">face</i></NavLink>}
                            {this.props.authorization.isAuth && <button className="icon primary" onClick={this.logout}><i className="material-icons">power_settings_new</i></button>} */}
                            {this.props.authorization.isAuth && <div className="signin" onClick={this.logout}><img src={account_circle} alt="account_circle" /></div>}
                            {!this.props.authorization.isAuth && <div className="signin"><NavLink to="/login" className="navitem" activeClassName="active"><img src={account_circle} alt="account_circle" /></NavLink></div>}
                        </div>
                        <div className="mobilemenu" onMouseUp={this.toggleMenu}><i className="material-icons">menu</i></div>
                    </div>
                </div>

                <div className="mobilenav">
                    <div className={(this.state.visible ? "slider show" : "slider hide")} onClick={this.toggleMenu}>
                        <div className={(this.state.visible ? "": "hidetext")} onClick={this.toggleMenu}>
                            <div className="header">
                                <div className="logo"><img src={curate_white} alt="IOAK logo" /></div>
                                                                    
                            <div className="authheader">
                                    {/* {this.props.authorization.isAuth && <div className="label">Log Out</div>}
                                    {!this.props.authorization.isAuth && <div className="label">Log In</div>} */}
                                    {/* {!this.props.authorization.isAuth && <NavLink to="/login" className="navitem" activeClassName="active"><i className="material-icons">face</i></NavLink>}
                                    {this.props.authorization.isAuth && <button className="icon primary" onClick={this.logout}><i className="material-icons">power_settings_new</i></button>} */}
                                    {this.props.authorization.isAuth && <div className="signin" onClick={this.logout}><img src={account_circle} alt="account_circle" /></div>}
                                    {!this.props.authorization.isAuth && <div className="signin"><NavLink to="/login" className="navitem" activeClassName="active"><img src={account_circle} alt="account_circle" /></NavLink></div>}
                            </div>
                            </div>
                            <hr />
                            {/* <NavLink to="/home" className="navitem" activeClassName="active"><p><i className="material-icons">home</i>Home</p></NavLink><br /> */}
                            {this.props.authorization.isAuth && 
                                <>
                                <NavLink to="/bookmarks" className="navitem" activeClassName="active"><p><i className="material-icons">bookmarks</i>Bookmarks</p></NavLink><br />
                                <NavLink to="/notes" className="navitem" activeClassName="active"><p><i className="material-icons">note</i>Notes</p></NavLink><br />
                                <NavLink to="/settings" className="navitem" activeClassName="active"><p><i className="material-icons">note</i>Settings</p></NavLink><br />
                                <NavLink to="/help" className="navitem" activeClassName="active"><p><i className="material-icons">note</i>Help</p></NavLink>
                                </>
                            }
                        </div>
                        <div className={(this.state.visible ? "mobilefooter": "hidetext")}>
                            {this.props.authorization.isAuth && 
                                <div>
                                    {this.props.authorization.firstname}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Notification />
            </div>
        );
    }
}

Navigation.propTypes = {
    addNotification: PropTypes.func.isRequired,
    getAuth: PropTypes.func.isRequired,
    addAuth: PropTypes.func.isRequired,
    removeAuth: PropTypes.func.isRequired,
    authorization: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,

    profile: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    authorization: state.authorization,
    profile: state.profile
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth, addNotification, getProfile })(withCookies(Navigation));