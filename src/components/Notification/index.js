import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotifications, removeNotification, getSpinner, stopSpinner } from '../../actions/NotificationActions';
import PropTypes from 'prop-types';
import './style.scss';

class Notification extends Component {
    componentWillMount() {
        this.props.getNotifications();
        this.props.getSpinner();
        if (this.props.notification) {
            this.props.stopSpinner();
        }
        if (this.props.notification && this.props.notification.timeout) {
            setTimeout(() => {
                this.props.removeNotification();
            }, this.props.notification.timeout);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notification) {
            this.props.stopSpinner();
        }
        if (nextProps.notification && nextProps.notification.timeout) {
            setTimeout(() => {
                this.props.removeNotification();
            }, nextProps.notification.timeout);
        }
    }

    render() {
        return (
            <>
            {this.props.notification && <div className={"notification " + this.props.notification.type}><div className="message">{this.props.notification.message}</div></div>}
            {this.props.spinner && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
            {/* {this.props.spinner && <div className="lds-facebook"><div></div><div></div><div></div></div>} */}
            {/* {this.props.spinner && <div className="lds-dual-ring"></div>} */}
            </>
        );
    }
}

Notification.propTypes = {
    getSpinner: PropTypes.func.isRequired,
    stopSpinner: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired,
    notification: PropTypes.object
}

const mapStateToProps = state => ({
    notification: state.notification.notification,
    spinner: state.notification.spinner
})

export default connect(mapStateToProps, { getSpinner, stopSpinner, getNotifications, removeNotification })(Notification);