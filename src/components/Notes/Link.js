import React, { Component } from 'react';
import ActionButton from '../Ux/ActionButton';
import ReactMarkdown from 'react-markdown';

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
            tags.push(<ActionButton key={item} leftLabel={item} leftAction={() => this.tag(item)}></ActionButton>);
        })
        return (
            <div>
                <div className="typography-3">
                    {/* <div className="action-icon">
                        <i onClick={this.edit} className="material-icons">edit</i>
                        <i onClick={this.delete} className="material-icons">delete</i>
                    </div> */}
                    {this.props.note.title}
                </div>
                <ActionButton icon="edit" type="primary" leftLabel="edit" leftAction={this.edit}></ActionButton>
                <ActionButton icon="delete" type="danger" leftLabel="delete" leftAction={this.delete}></ActionButton>
                
                {tags}
                <ReactMarkdown source={this.props.note.content} />

            </div>
        )
    }
}

export default Link;
