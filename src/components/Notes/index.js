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
import './style.scss';
import NoteRef from './NoteRef';
import Showdown from '../Ux/Showdown';

const baseUrl = process.env.REACT_APP_API_URL;

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            view: [],
            isAddDialogOpen: false,

            selectedNoteId: '',

            title: '',
            content: '',
            tags: ''
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
            tags: ''
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
            selectedNoteId: noteId
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

    saveNoteEvent = () => {
        this.saveNote({
            id: null,
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags
        });
    }

    saveNote = (note, edit=false) => {
        const that = this;
        axios.put(baseUrl + constants.API_URL_NOTE, {
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags
        },
        {
            headers: {
                Authorization: 'Bearer ' + this.props.authorization.token
            }
        })
        .then(function(response) {
            if (response.status === 201) {
                if (edit) {
                    that.props.sendEvent('notification', true, {type: 'success', message: 'Note edited', duration: 5000});
                    that.props.sendEvent('closeNoteEditView', true);
                } else {
                    that.props.sendEvent('notification', true, {type: 'success', message: 'Note created', duration: 5000});
                    that.toggleAddDialog();
                }
                
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
                <Link id={item._id} note={item} saveNote={this.saveNote} deleteNote={this.deleteNote} event={this.props.event}/>
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
                    <ArcTextField label="Tags (separated by blank spaces)" data={this.state} id="tags" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Content (Markdown / HTML / Plaintext)" data={this.state} id="content" multiline rows='20' handleChange={e => this.handleChange(e)} />
                    <div className="actions">
                        <button onClick={this.toggleAddDialog} className="default disabled left"><i class="material-icons">close</i>Cancel</button>
                        <button onClick={this.saveNoteEvent} className="primary animate right"><i class="material-icons">check</i>Save</button>
                    </div>
                </ArcDialog>

                <ViewResolver event={this.props.event}>
                    <View main>
                        {noteview}
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="section-main">
                                {/* <div className="typography-1 space-bottom-2">HTML / Markdown supported</div> */}
                                <button onClick={this.newNote} className="primary block space-top-2 space-bottom-2 space-left-2">
                                    <i class="material-icons">add</i>New Note
                                </button>
                                {listNoteRef}
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
