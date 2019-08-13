import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';

class Link extends Component {
    constructor(props) {
        super(props);

    }
    removeTag = (tag) => {
        alert(this.props.id + ' remove ' + tag);
        console.log(this.props);
    }
    tag = (tag) => {
        alert(this.props.id + ' show results only for ' + tag);
        console.log(this.props);
    }

    edit = () => {
        this.props.editBookmark(this.props.bookmark);
    }

    render() {
        const tags = [];
        this.props.bookmark.tags.split(" ").map(item => {
            tags.push(<ActionButton key={item} leftLabel={item} leftAction={() => this.tag(item)} rightLabel="x" rightAction={() => this.removeTag(item)}></ActionButton>);
        })
        return (
            <div>
                <div className="typography-3">{this.props.bookmark.title}</div>
                <ActionButton type="danger" leftLabel="edit" leftAction={this.edit}></ActionButton>
                <ActionButton type="danger" leftLabel="delete" leftAction={this.tag}></ActionButton>
                <div className="typography-2 color-secondary">{this.props.bookmark.href}</div>
                <div className="typography-1 space-bottom-1">{this.props.bookmark.description}</div>
                {tags}
            </div>
        )
    }
}

export default Link;
