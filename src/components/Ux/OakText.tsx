import React from 'react';
import './OakText.scss';

interface Props {
    label: string,
    id: string,
    data: any,
    type?: string,
    handleChange: any,
    errorFields?: any,
    disabled?: boolean,
    rows?: number,
    multiline?: boolean
}
const OakText = (props: Props) => {
    return (
        <div className="oak-text-field">
            <label>{props.label}</label>
            {!props.multiline && <input disabled={props.disabled} autoComplete="off"
                className={(props.errorFields && props.errorFields[props.id] ? "error" : "") + (props.disabled ? " disabled" : "")}
                type={props.type ? props.type : "text"} name={props.id} value={props.data[props.id]} onChange={props.handleChange}></input>}
            {/* rows={props.rows ? props.rows : 4} */}
            {props.multiline && <textarea disabled={props.disabled}
                className={(props.errorFields && props.errorFields[props.id] ? "error" : "") + (props.disabled ? " disabled" : "")}
                name={props.id} value={props.data[props.id]} onChange={props.handleChange}></textarea>}
            {/* {props.multiline && <div contentEditable={props.disabled ? false : true} suppressContentEditableWarning={true}
                className={"textarea " + (props.errorFields && props.errorFields[props.id] ? "error" : "") + (props.disabled ? " disabled" : "")}
                onBlur={handleChange}>{props.data[props.id]}</div>} */}
        </div>
    )
}

export default OakText;
