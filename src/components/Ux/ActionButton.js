import React from 'react';
import PropTypes from 'prop-types';
import './ActionButton.scss';

function ActionButton(props) {
    return (
        <div className="action-button">
            <button className="left" onClick={props.action}>{props.label}</button>
            <button className="right" onClick={props.action}>x</button>
            {/* <a className="center" onClick={props.action}>{props.label}</a> */}
        </div>
    )
}

ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default ActionButton;
