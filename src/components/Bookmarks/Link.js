import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';

class Link extends Component {
    constructor(props) {
        super(props);
        if(this.props.tags) {
            this.state = {
                tags: this.props.tags.split(' ')
            }
        }
    }
    removeTag = (tag) => {
        alert(this.props.id + ' remove ' + tag);
        console.log(this.props);
    }
    tag = (tag) => {
        alert(this.props.id + ' show results only for ' + tag);
        console.log(this.props);
    }
    render() {
        const tags = [];
        this.state.tags.map(item => {
            tags.push(<ActionButton leftLabel={item} leftAction={() => this.tag(item)} rightLabel="x" rightAction={() => this.removeTag(item)}></ActionButton>);
        })
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>{this.props.href}</h3>
                <p>{this.props.description}</p>
                <br />
                {/* <ActionButton label={this.props.tags} action={this.tag}></ActionButton> */}
                {tags}
            </div>
        )
    }
}

export default Link;