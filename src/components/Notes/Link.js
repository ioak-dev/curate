import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';
import { classProperty } from '@babel/types';

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
        this.props.editNote(this.props.note);
    }

    delete = () => {
        this.props.deleteNote(this.props.id);
    }

    render() {
        const tags = [];
        this.props.note.tags.split(" ").map(item => {
            tags.push(<ActionButton key={item} leftLabel={item} leftAction={() => this.tag(item)} rightLabel="x" rightAction={() => this.removeTag(item)}></ActionButton>);
        })
        return (
            <div>
                <div className="typography-2">{this.props.note.title}</div>
                <div className="typography-1 space-bottom-1">{this.props.note.content}</div>
                {tags}
                <div ><br /></div>
                <ActionButton type="danger" leftLabel="edit" leftAction={this.edit}></ActionButton>
                <ActionButton type="danger" leftLabel="delete" leftAction={this.delete}></ActionButton>

            </div>
        )
    }
}

export default Link;
