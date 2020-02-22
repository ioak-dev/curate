import React, { ReactNode } from 'react';
import './oak-button-oval.scss';

interface Props {
    icon?: string,
    action?: any,
    variant?: 'block' | 'outline' | 'animate in' | 'animate out' | 'animate none' | 'disabled'
    theme?: 'primary' | 'secondary' | 'tertiary' | 'default',
    align?: 'left' | 'right' | 'center',
    small?: boolean,
    invert?: boolean,
    children?: ReactNode
}

const OakButton = (props:Props) => {

    const getStyle = () => {
        let style = props.theme ? props.theme : "";
        style = style + (props.variant ? " " + props.variant : "");

        if (!props.children) {
            style = style + " icon";
        }

        style = style + (props.invert ? " invert": "");

        style = style + (props.small ? " small" : "");

        style = style + (props.align ? " align-" + props.align : "");

        return style;
    }

    return (
        <button className={"oak-button " + getStyle()} onClick={props.action}>
            {props.icon && <i className="material-icons">{props.icon}</i>}
            {props.children && props.children}
        </button>
    )
}

export default OakButton;