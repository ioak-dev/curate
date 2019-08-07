import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';

class Link extends Component {
    tag = () => {
        alert('tag');
    }
    render() {
        return (
            <div>
                <h1>{this.props.url}</h1>
                <p>{this.props.tags}</p>
                <br />
                <ActionButton label="tagone" action={this.tag}></ActionButton>
                <ActionButton label="tagtwo" action={this.tag}></ActionButton>
            </div>
        )
    }
}

export default Link;