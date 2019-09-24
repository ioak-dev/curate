import React, { Component } from 'react';
import Link from './Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { constants } from '../Constants';
import axios from "axios";
import ArcTextField from '../Ux/ArcTextField';
import ArcDialog from '../Ux/ArcDialog';
import ViewResolver from '../Ux/ViewResolver';
import View from '../Ux/View';
import ReactMarkdown from 'react-markdown';
import './style.scss';
import NoteRef from './NoteRef';

const baseUrl = process.env.REACT_APP_API_URL;

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            view: [],
            isAddDialogOpen: false,

            editNote: false,
            editNotePreview: false,

            selectedNoteId: '',

            id: null,
            title: '',
            content: '',
            tags: '',
            editDialogLabel: 'Add'
        }
        this.props.receiveEvents();
    }
    componentDidMount() {
        if(this.props.authorization.isAuth) {
            this.initializeNotes(this.props.authorization);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.authorization && !this.state.selectedNoteId) {
            this.initializeNotes(nextProps.authorization);
        }
    }

    initializeNotes(authorization, selectedNoteId) {
        const that = this;
        axios.get(baseUrl + constants.API_URL_NOTE,
            {
                headers: {
                    Authorization: 'Bearer ' + authorization.token
                }
            })
            .then(function(response) {
                that.setState({items: response.data, view: response.data});

                if (selectedNoteId) {
                    that.setState({selectedNoteId: selectedNoteId});
                } else if (!that.state.selectedNoteId && response.data && response.data.length > 0) {
                    that.setState({selectedNoteId: response.data[0]._id});
                }
            }
        );
    }

    newNote = () => {
        this.toggleAddDialog();
        this.props.sendEvent('sidebar', false);
    }

    toggleAddDialog = () => {
        this.setState({
            isAddDialogOpen: !this.state.isAddDialogOpen,
            id: null,
            title: '',
            content: '',
            tags: '',
            editDialogLabel: 'Add'
        })
    }

    closeNewNote = () => {
        this.setState({
            isAddDialogOpen: false,
            id: null,
            title: '',
            content: '',
            tags: '',
            editDialogLabel: 'Add'
        })
    }

    toggleEditNotePreview = () => {
        this.setState({
            editNotePreview: !this.state.editNotePreview
        })
    }


    closeEditNote = () => {
        this.setState({
            editNote: !this.state.editNote,
            editNotePreview: true,
        })
    }

    editNote = (note) => {
        this.setState({
            editNote: true,
            editNotePreview: true,
            id: note._id,
            title: note.title,
            content: note.content,
            tags: note.tags,
            editDialogLabel: 'Save'
        })
    }

    deleteNote = (noteId) => {
        const that = this;
        axios.delete(baseUrl + constants.API_URL_NOTE + "/" + noteId,
        {
            headers: {
                Authorization: 'Bearer ' + this.props.authorization.token
            }
        })
        .then(function(response) {
            if (response.status === 201) {
                that.props.sendEvent('notification', true, {type: 'success', message: 'Note deleted', duration: 5000});
                that.setState({
                    selectedNoteId: null
                }, () => that.initializeNotes(that.props.authorization));
                
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                that.props.logout(null, 'failure', 'Session expired. Login again');
            }
        })
    }

    selectNote = (noteId) => {
        this.setState({
            selectedNoteId: noteId,
            editNote: false
        })
        this.props.sendEvent('sidebar', false);
    }

    searchNotesByTags = () =>{
        const that = this;
        axios.get(baseUrl + constants.API_URL_NOTE,
            {
                headers: {
                    Authorization: 'Bearer ' + this.props.authorization.token
                }
            })
            .then(function(response) {
                    console.log(response);
                    that.setState({items: response.data, view: response.data});
                }
            );
    }

    saveNote= () => {
        const that = this;
        axios.put(baseUrl + constants.API_URL_NOTE, {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags
        },
        {
            headers: {
                Authorization: 'Bearer ' + this.props.authorization.token
            }
        })
        .then(function(response) {
            if (response.status === 201) {
                if (that.state.editNote) {
                    that.props.sendEvent('notification', true, {type: 'success', message: 'Note Updated', duration: 5000});
                    that.closeEditNote();
                } else {
                    that.props.sendEvent('notification', true, {type: 'success', message: 'Note created', duration: 5000});
                    that.closeNewNote();
                }
                console.log(response);
                that.initializeNotes(that.props.authorization, response.data._id);
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                that.props.logout(null, 'failure', 'Session expired. Login again');
            }
        })
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    }

    render() {
        const noteview = this.state.view.map(item => (
            <>
            {item._id === this.state.selectedNoteId && <div key={item._id}>
                <Link id={item._id} note={item} editNote={this.editNote} deleteNote={this.deleteNote}/>
            </div>}
            </>
        ))
        const listNoteRef = this.state.view.map(item => (
            <div key={item._id}>
            <NoteRef selected={this.state.selectedNoteId === item._id ? true : false} id={item._id} note={item} selectNote={this.selectNote} />
            </div>
        ))
        return (
            <div className="notes">
                <ArcDialog title="Add Note" visible={this.state.isAddDialogOpen} toggleVisibility={this.toggleAddDialog}>
                    <ArcTextField label="Title" data={this.state} id="title" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Tags" data={this.state} id="tags" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Content" data={this.state} id="content" multiline rows='20' handleChange={e => this.handleChange(e)} />
                    <div className="actions">
                        <button onClick={this.toggleAddDialog} className="default disabled">Cancel</button>
                        <button onClick={this.saveNote} className="primary animate out down">{this.state.editDialogLabel}</button>
                    </div>
                </ArcDialog>

                <ViewResolver event={this.props.event}>
                    <View main>
                        {/* <button onClick={this.toggleAddDialog} className="primary animate in down space-bottom-1">Add Note</button> */}
                        {!this.state.editNote && noteview}
                        {this.state.editNote && 
                            <div>
                                <div className="typography-3">{this.state.title}</div>
                                {/* <ActionButton type="primary" leftLabel="Save" leftAction={this.saveNote}></ActionButton>
                                <ActionButton type="default" leftLabel="Cancel" leftAction={this.toggleEditNote}></ActionButton> */}

                                <ArcTextField label="Title" data={this.state} id="title" handleChange={e => this.handleChange(e)} />
                                <ArcTextField label="Tags" data={this.state} id="tags" handleChange={e => this.handleChange(e)} />
                                {this.state.editNotePreview && <div className="edit-note-view">
                                    <div><ArcTextField label="Content" data={this.state} id="content" multiline handleChange={e => this.handleChange(e)} /></div>
                                    <div>
                                        <ReactMarkdown source={this.state.content} />
                                    </div>
                                </div>}
                                {!this.state.editNotePreview && <ArcTextField label="Content" data={this.state} id="content" multiline handleChange={e => this.handleChange(e)} />}
                                <div className="space-top-2" />
                                <button onClick={this.closeEditNote} className="default disabled">Cancel</button>
                                {!this.state.editNotePreview && <button onClick={this.toggleEditNotePreview} className="default">Show Preview</button>}
                                {this.state.editNotePreview && <button onClick={this.toggleEditNotePreview} className="default">Hide Preview</button>}
                                <button onClick={this.saveNote} className="primary animate out down">Save</button>
                        </div>}
                        
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="section-main">
                                {listNoteRef}
                            </div>
                        
                            <div className="section-footer">
                                <div>
                                    <button onClick={this.newNote} className="default animate in left small">New Note</button>
                                </div>
                            </div>
                        </div>
                    </View>
                </ViewResolver>
            </div>
        )
    }
}

Notes.propTypes = {
    receiveEvents: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
    event: PropTypes.object
}

const mapStateToProps = state => ({
  event: state.event
})

export default Notes;
