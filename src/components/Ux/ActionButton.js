import React from 'react';
import PropTypes from 'prop-types';
import './ActionButton.scss';

function ActionButton(props) {
    const icon = <i class="material-icons">{props.icon}</i>;
    return (
        <div className="action-button">
            {props.leftLabel && props.rightLabel && <button className={"left " + props.type} onClick={props.leftAction}>{props.icon && icon}{props.leftLabel}</button>}
            {props.leftLabel && props.rightLabel && <button className={"right " + props.type} onClick={props.rightAction}>{props.icon && icon}{props.rightLabel}</button>}
            {props.leftLabel && !props.rightLabel && <button className={"center " + props.type} onClick={props.leftAction}>{props.icon && icon}{props.leftLabel}</button>}
        </div>
    )
}

ActionButton.propTypes = {
    leftLabel: PropTypes.string.isRequired,
    leftAction: PropTypes.func.isRequired,
    rightLabel: PropTypes.string,
    rightAction: PropTypes.func
};

export default ActionButton;
