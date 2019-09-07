import React from 'react';
import PropTypes from 'prop-types';
import './ActionButton.scss';

function ActionButton(props) {
    const icon = <i class="material-icons">{props.icon}</i>;
    return (
        <div className="action-button">
            {props.leftLabel && props.rightLabel && <button className={"left " + props.type} onClick={props.leftAction}>{icon}{props.leftLabel}</button>}
            {props.leftLabel && props.rightLabel && <button className={"right " + props.type} onClick={props.rightAction}>{icon}{props.rightLabel}</button>}
            {props.leftLabel && !props.rightLabel && <button className={"center " + props.type} onClick={props.leftAction}>{icon}{props.leftLabel}</button>}
        </div>
    )
}

ActionButton.propTypes = {
    // label: PropTypes.string.isRequired,
    // action: PropTypes.func.isRequired
};

export default ActionButton;
