import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ArcDialog.scss';
import { receiveEvents, sendEvent } from '../../actions/EventActions';

class ArcDialog extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            if (nextProps.visible) {
                this.props.sendEvent('dialog', true, null);
            } else {
                this.props.sendEvent('dialog', false, null);
            }
        }
    }
    render() {
        return (
            <>
            <div className="dialog-outer">
                <div className={(this.props.visible ? "dialog show" : "dialog hide")}>
                    {this.props.title && <div className="header">{this.props.title}<i className="material-icons" onClick={this.props.toggleVisibility}>close</i></div>}
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
            </>
        )
    }
}

ArcDialog.propTypes = {
    visible: PropTypes.bool,
    toggleVisibility: PropTypes.func.isRequired,
    receiveEvents: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, {sendEvent, receiveEvents}) (ArcDialog);