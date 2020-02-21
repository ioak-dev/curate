import React, { Component } from 'react';
import Showdown from '../Ux/Showdown';
import OakSelect from '../Ux/OakSelect';
import { receiveMessage } from '../../events/MessageService';
import OakText from '../Ux/OakText';
import OakButton from '../Ux/OakButton';
import OakPrompt from '../Ux/OakPrompt';

interface Props {
    note: any,
    deleteNote: Function,
    saveNote: Function,
    handleChange: Function,
    notebooks: any,
    editNote: boolean,
    setEditNote: Function
}

interface State {
    preview: boolean,
    showDeletePrompt: boolean,
    newNotebook: string,
    flags: any
}

class NoteItem extends Component<Props, State> {
    
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            showDeletePrompt: false,
            preview: true,
            newNotebook: '',

            flags: [
                {
                    key: 'one',
                    value: <div className="select-palette one" />
                },
                {
                    key: 'two',
                    value: <div className="select-palette two" />
                },
                {
                    key: 'three',
                    value: <div className="select-palette three" />
                },
                {
                    key: 'four',
                    value: <div className="select-palette four" />
                },
                {
                    key: 'five',
                    value: <div className="select-palette five" />
                },
                {
                    key: 'six',
                    value: <div className="select-palette six" />
                }
            ]
        }
    }

    toggleDeletePrompt = () => {
        this.setState ({
            showDeletePrompt: !this.state.showDeletePrompt
        })
    }

    componentDidMount() {
        this._isMounted = true;
        // receiveMessage().subscribe(message => {
        //     if (this._isMounted) {
        //         if (message.name === 'closeNoteEditView' && message.signal) {
        //             this.hideEdit();
        //             this.setState({newNotebook: ''});
        //         }
        //     }
        // });
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    delete = () => {
        this.props.deleteNote(this.props.note._id);
    }

    save = () => {
        let notebook = this.props.note.notebook;

        if (notebook === '<create new>') {
            notebook = this.state.newNotebook;
        }

        this.props.saveNote(this.props.note, true)
    }

    togglepreview = () => {
        this.setState({
            preview: !this.state.preview
        })
    }

    // handleChange = (event) => {
    //     this.setState(
    //         {
    //             ...this.state,
    //             [event.target.name]: event.target.value
    //         }
    //     )
    // }

    render() {
        const tags: any = [];
        if (this.props.note.tags) {
            this.props.note.tags.split(" ").map(item => {
                tags.push(<div key={item} className="tag">{item}</div>);
            })
        }

        return (
            <>
            <OakPrompt visible={this.state.showDeletePrompt} toggleVisibility={this.toggleDeletePrompt} action={this.delete} text="Are you sure, you want to delete the bookmark?" />
            {!this.props.editNote && 
            <>
                <div className="notebook"><i className="material-icons">insert_drive_file</i>{this.props.note.notebook}</div>
                {/* <div className="space-bottom-2" /> */}
                <div className="typography-3 space-bottom-1">
                    {this.props.note.title}
                </div>
                {tags}
                <div className="space-bottom-2" />
                <OakButton action={() => this.props.setEditNote(true)} theme="secondary" variant="animate in" align="left"><i className="material-icons">edit</i>Edit</OakButton>
                <OakButton action={this.toggleDeletePrompt} theme="secondary" variant="animate in" align="right"><i className="material-icons">delete</i>Delete</OakButton>
                
                
                <Showdown source={this.props.note.content} />

            </>}
            
            {this.props.editNote && 
                <div>
                    <div className="typography-3 space-bottom-1">{this.props.note.title}</div>
                    
                    <OakButton action={this.save} theme="primary" variant="animate in" align="left"><i className="material-icons">double_arrow</i>Save</OakButton>
                    <OakButton action={() => this.props.setEditNote(true)} theme="default" variant="outline" align="center"><i className="material-icons">refresh</i>Undo All</OakButton>
                    <OakButton action={() => this.props.setEditNote(false)} theme="default" variant="outline" align="center"><i className="material-icons">close</i>Cancel</OakButton>
                    {!this.state.preview && <OakButton action={this.togglepreview} theme="default" variant="outline" align="right"><i className="material-icons">visibility</i>Show Preview</OakButton>}
                    {this.state.preview && <OakButton action={this.togglepreview} theme="default" variant="outline" align="right"><i className="material-icons">visibility_off</i>Hide Preview</OakButton>}
                    
                    <div><OakSelect width="width-25" label="Flag" data={this.props.note} id="flag" handleChange={e => this.props.handleChange(e)} objects={this.state.flags} /></div>
                    <div><OakSelect label="Notebook" data={this.props.note} id="notebook" handleChange={e => this.props.handleChange(e)} elements={this.props.notebooks} firstAction="<create new>" /></div>
                    <div>
                        {this.props.note.notebook === '<create new>' && <OakText label="Notebook name" data={this.props.note} id="newNotebook" handleChange={e => this.props.handleChange(e)} />}
                    </div>
                    <OakText label="Title" data={this.props.note} id="title" handleChange={e => this.props.handleChange(e)} />
                    <OakText label="Tags (separated by blank spaces)" data={this.props.note} id="tags" handleChange={e => this.props.handleChange(e)} />

                    {this.state.preview && <div className="edit-note-view">
                        <div><OakText label="Content (Markdown / HTML / Plaintext)" data={this.props.note} id="content" multiline handleChange={e => this.props.handleChange(e)} /></div>
                        <div>
                            <div className="typography-5 space-bottom-1">Preview</div>
                            <Showdown source={this.props.note.content} />
                        </div>
                    </div>}
                    {!this.state.preview && <OakText label="Content (Markdown / HTML / Plaintext)" data={this.props.note} id="content" multiline handleChange={e => this.props.handleChange(e)} />}
                    <div className="space-top-2" />
            </div>}
            </>
        )
    }
}

export default NoteItem;
