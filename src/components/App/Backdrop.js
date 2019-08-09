import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Backdrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event && nextProps.event.name === 'dialog') {
            if (nextProps.event.signal) {
                this.setState({
                    backdrop: 'backdrop-fade'
                })
            } else {
                this.setState({
                    backdrop: ''
                })
            }
        }
    }

    render() {
        return (
            <div className={this.state.backdrop}></div>
        );
    }
}

Backdrop.propTypes = {
    sendEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
}

export default Backdrop;