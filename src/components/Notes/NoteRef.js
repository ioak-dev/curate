import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';
import './style.scss';
const removeMd = require('remove-markdown');

class NoteRef extends Component {
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

    selectNote = () => {
        this.props.selectNote(this.props.id);
    }

    render() {
        const tags = [];
        if (this.props.note.tags) {
            this.props.note.tags.split(" ").map(item => {
                tags.push(<ActionButton key={item} leftLabel={item} leftAction={() => this.tag(item)} rightLabel="x" rightAction={() => this.removeTag(item)}></ActionButton>);
            })
        }
        return (
            <>
            <div className={this.props.selected ? "noteref selected" : "noteref"} onClick={this.selectNote}>
                <div className="content">
                    <div className="title typography-2">{this.props.note.title}</div>
                    <div className="detail typography-1">{removeMd(this.props.note.content.substring(0, 200))}</div>
                    {/* <div className="detail typography-1"><Showdown source={this.props.note.content.substring(0, 150)} /></div> */}
                </div>
            </div>
            <div className="separator" />
            {/* <hr /> */}
            </>
        )
    }
}

export default NoteRef;
