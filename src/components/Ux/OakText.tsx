import React from 'react';
import './OakText.scss';

function OakText(props) {
    return (
        <div className="arc-text-field">
            <label>{props.label}</label>
            <input type="text" name={props.name} value={props.value} onChange={props.handleChange}></input>
        </div>
    )
}

OakText.propTypes = {
};

export default OakText;
