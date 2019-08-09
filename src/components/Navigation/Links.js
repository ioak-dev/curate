import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { NavLink } from 'react-router-dom';

class Links extends Component {
    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        return (
            <div className="links">
                {this.props.authorization.isAuth &&
                    <>
                    <NavLink to="/bookmarks" className="navitem" activeClassName="active">Bookmarks</NavLink>
                    <NavLink to="/notes" className="navitem" activeClassName="active">Notes</NavLink>
                    <NavLink to="/settings" className="navitem" activeClassName="active">Settings</NavLink>
                    <NavLink to="/help" className="navitem" activeClassName="active">Help</NavLink>
                    </>
                }
            </div>
        );
    }
}

Links.propTypes = {
    authorization: PropTypes.object.isRequired
}

export default Links;