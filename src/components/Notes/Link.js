import React, { Component } from 'react';
import Showdown from '../Ux/Showdown';
import ArcTextField from '../Ux/ArcTextField';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import ArcSelect from '../Ux/ArcSelect';

class Link extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editNote: false,
            preview: true,
            newNotebook: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event && nextProps.event.name === 'closeNoteEditView' && nextProps.event.signal) {
            this.hideEdit();
            this.setState({newNotebook: ''});
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

    edit = () => {
        this.props.editNote(this.props.note);
    }

    delete = () => {
        this.props.deleteNote(this.props.id);
    }

    showEdit = () => {
        this.setState({
            editNote: true,
            title: this.props.note.title,
            content: this.props.note.content,
            tags: this.props.note.tags,
            notebook: this.props.note.notebook
        })
    }

    hideEdit = () => {
        this.setState({
            editNote: false
        })
    }

    save = () => {
        let notebook = this.state.notebook;

        if (notebook === '<create new>') {
            notebook = this.state.newNotebook;
        }

        this.props.saveNote({
            id: this.props.id,
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags,
            notebook: notebook
        }, true)
    }

    togglepreview = () => {
        this.setState({
            preview: !this.state.preview
        })
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {
        const tags = [];
        if (this.props.note.tags) {
            this.props.note.tags.split(" ").map(item => {
                tags.push(<div key={item} className="tag">{item}</div>);
            })
        }

        return (
            <>
            {!this.state.editNote && 
            <>
                <div className="notebook"><i className="material-icons">insert_drive_file</i>{this.props.note.notebook}</div>
                {/* <div className="space-bottom-2" /> */}
                <div className="typography-3 space-bottom-1">
                    {this.props.note.title}
                </div>
                {tags}
                <div className="space-bottom-2" />
                <button onClick={this.showEdit} className="secondary animate left"><i className="material-icons">edit</i>Edit</button>
                <button onClick={this.delete} className="secondary animate right"><i className="material-icons">delete</i>Delete</button>
                
                
                <Showdown source={this.props.note.content} />

            </>}
            
            {this.state.editNote && 
                <div>
                    <div className="typography-3 space-bottom-1">{this.state.title}</div>
                    
                    <button onClick={this.save} className="primary animate left space-bottom-2"><i className="material-icons">double_arrow</i>Save</button>
                    <button onClick={this.showEdit} className="default disabled center"><i className="material-icons">refresh</i>Undo All</button>
                    <button onClick={this.hideEdit} className="default disabled center"><i className="material-icons">close</i>Cancel</button>
                    {!this.state.preview && <button onClick={this.togglepreview} className="default disabled right"><i className="material-icons">visibility</i>Show Preview</button>}
                    {this.state.preview && <button onClick={this.togglepreview} className="default disabled right"><i className="material-icons">visibility_off</i>Hide Preview</button>}

                    <div><ArcSelect label="Notebook" data={this.state} id="notebook" handleChange={e => this.handleChange(e)} elements={this.props.notebooks} firstAction="<create new>" /></div>
                    <div>
                        {this.state.notebook === '<create new>' && <ArcTextField label="Notebook name" data={this.state} id="newNotebook" handleChange={e => this.handleChange(e)} />}
                    </div>
                    <ArcTextField label="Title" data={this.state} id="title" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Tags (separated by blank spaces)" data={this.state} id="tags" handleChange={e => this.handleChange(e)} />

                    {this.state.preview && <div className="edit-note-view">
                        <div><ArcTextField label="Content (Markdown / HTML / Plaintext)" data={this.state} id="content" multiline handleChange={e => this.handleChange(e)} /></div>
                        <div>
                            <div className="typography-1 space-bottom-1">Preview</div>
                            <Showdown source={this.state.content} />
                        </div>
                    </div>}
                    {!this.state.preview && <ArcTextField label="Content (Markdown / HTML / Plaintext)" data={this.state} id="content" multiline handleChange={e => this.handleChange(e)} />}
                    <div className="space-top-2" />
            </div>}
            </>
        )
    }
}

export default Link;
