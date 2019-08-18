import React, { Component } from 'react';
import Link from './Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { constants } from '../Constants';
import axios from "axios";
import ArcTextField from '../Ux/ArcTextField';
import ArcDialog from '../Ux/ArcDialog';
import ViewResolver from '../Ux/ViewResolver';
import View from '../Ux/View';
import ActionButton from '../Ux/ActionButton';
import './style.scss';

const baseUrl = process.env.REACT_APP_API_URL;

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            view: [],
            isEditDialogOpen: false,

            id: null,
            title: '',
            content: '',
            tags: '',
            editDialogLabel: 'Add'
        }
    }
    componentDidMount() {
        if(this.props.authorization.isAuth) {
            this.initializeNotes(this.props.authorization);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.authorization) {
            this.initializeNotes(nextProps.authorization);
        }
    }

    initializeNotes(authorization) {
        const that = this;
        axios.get(baseUrl + constants.API_URL_NOTE,
            {
                headers: {
                    Authorization: 'Bearer ' + authorization.token
                }
            })
            .then(function(response) {
                console.log(response);
                that.setState({items: response.data, view: response.data});
            }
        );
    }

    toggleEditDialog = () => {
        this.setState({
            isEditDialogOpen: !this.state.isEditDialogOpen,
            id: null,
            title: '',
            content: '',
            tags: '',
            editDialogLabel: 'Add'
        })
    }

    editNote = (note) => {
        this.setState({
            isEditDialogOpen: true,
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
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                that.props.logout(null, 'failure', 'Session expired. Login again');
            }
        })
    }

    searchBNotesByTags = () =>{
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

    addNote= () => {
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
                that.props.sendEvent('notification', true, {type: 'success', message: 'Note created', duration: 5000});
                that.toggleEditDialog();
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
        const listview = this.state.view.map(item => (
            <div key={item._id}>
            <Link id={item._id} note={item} editNote={this.editNote} deleteNote={this.deleteNote}/>
            <br />
            </div>
        ))
        return (
            <div className="notes">
                <ArcDialog title="Add Note" visible={this.state.isEditDialogOpen} toggleVisibility={this.toggleEditDialog}>
                    <ArcTextField label="Title" data={this.state} id="title" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Content" data={this.state} id="content" multiline rows='5' handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Tags" data={this.state} id="tags" handleChange={e => this.handleChange(e)} />
                    <div className="actions">
                        <button onClick={this.toggleEditDialog} className="default disabled">Cancel</button>
                        <button onClick={this.addNote} className="primary animate out down">{this.state.editDialogLabel}</button>
                    </div>
                </ArcDialog>

                <ViewResolver>
                    <View main>
                        <button onClick={this.toggleEditDialog} className="primary animate in down space-bottom-1">Add Note</button>
                        {listview}
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="filter-body">
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>

                                <div className="typography-2 space-top-2">Search</div>
                                <ArcTextField label="Search text" id="serachtext" data={this.state} handleChange={e => this.handleChange(e)} />
                            </div>
                            <div className="footer">
                                <div>
                                <button onClick={this.searchNotesByTags} className="primary animate in left">Apply</button>
                                </div>
                                <div>
                                <button onClick={this.toggleEditDialog} className="primary">Clear</button>
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
}

export default Notes;
