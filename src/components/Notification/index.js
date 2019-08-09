import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            notification: null
        }
    }
    componentWillMount() {
        this.processNextProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.processNextProps(nextProps);
    }

    processNextProps(nextProps) {
        if (nextProps.event && nextProps.event.name === 'spinner') {
            this.setState({
                spinner: nextProps.event.signal
            })
        }

        if (nextProps.event && nextProps.event.name === 'notification') {
            if (!nextProps.event.signal) {
                this.setState({
                    notification: null,
                })
            } else {
                this.setState({
                    notification: nextProps.event.data,
                    spinner: false
                })
                
                if (nextProps.event.data.duration) {
                    setTimeout(() => {
                        this.setState({
                            notification: null
                        })
                    }, nextProps.event.data.duration);
                }
            }
        }
    }

    render() {
        return (
            <>
            {this.state.notification && <div className={"notification " + this.state.notification.type}><div className="message">{this.state.notification.message}</div></div>}
            {this.state.spinner && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
            {/* {this.props.spinner && <div className="lds-facebook"><div></div><div></div><div></div></div>} */}
            {/* {this.props.spinner && <div className="lds-dual-ring"></div>} */}
            </>
        );
    }
}

Notification.propTypes = {
    sendEvent: PropTypes.func.isRequired,
    event: PropTypes.object
}

export default Notification;