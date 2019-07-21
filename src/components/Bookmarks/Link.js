import React, { Component } from 'react';

class Link extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.url}</h1>
                <p>{this.props.tags}</p>
            </div>
        )
    }
}

export default Link;