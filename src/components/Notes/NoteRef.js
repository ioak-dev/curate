import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';
import ReactMarkdown from 'react-markdown';
import './style.scss';

class NoteRef extends Component {
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

    selectNote = () => {
        this.props.selectNote(this.props.id);
    }

    render() {
        const tags = [];
        this.props.note.tags.split(" ").map(item => {
            tags.push(<ActionButton key={item} leftLabel={item} leftAction={() => this.tag(item)} rightLabel="x" rightAction={() => this.removeTag(item)}></ActionButton>);
        })
        return (
            <>
            <div className={this.props.selected ? "noteref selected" : "noteref"} onClick={this.selectNote}>
                <div className="title typography-1">{this.props.note.title}</div>
                {/* <div className="detail typography-1">{this.props.note.content.substring(1, 150)}</div> */}
                <div className="detail typography-1"><ReactMarkdown source={this.props.note.content.substring(0, 150)} /></div>
                
            </div>
            <hr />
            </>
        )
    }
}

export default NoteRef;
