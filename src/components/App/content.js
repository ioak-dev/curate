import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './style.scss';
import Home from '../../components/Home';
import Bookmarks from '../Bookmarks';
import Notes from '../Notes';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Auth/Login';
import PrivateRoute from '../Auth/PrivateRoute';
import AuthInit from '../Auth/AuthInit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/ProfileActions';

class Content extends Component {
    constructor(props) {
        super(props);
        this.props.getProfile();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <div className={"App " + this.props.profile.theme}>
                <HashRouter>
                <AuthInit />
                <div className="body">
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/bookmarks" component={Bookmarks}/>
                        <PrivateRoute path="/notes" component={Notes} />
                    </div>
                </div>
                </HashRouter>
            </div>
        );
    }
}

Content.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfile })(Content);
