import React, { Component } from 'react';
import Link from './Link';
import { Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import { constants } from '../Constants';
import axios from "axios";
import ArcTextField from '../Ux/ArcTextField';
import ArcDialog from '../Ux/ArcDialog';
import ViewResolver from '../Ux/ViewResolver';
import View from '../Ux/View';
import './style.scss';
import NoteRef from './NoteRef';
import { isEmptyOrSpaces, match, sort } from '../Utils';
import ArcSelect from '../Ux/ArcSelect';

const queryString = require('query-string');
const baseUrl = process.env.REACT_APP_API_URL;

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            searchResults: [],
            view: [],
            isAddDialogOpen: false,

            selectedNoteId: '',

            title: '',
            content: '',
            tags: '',
            newNotebook: '',
            existingNotebook: '',
            existingNotebookList: [],
            filteredNotebookList: [],
            notebookFilter: 'all notebooks',
            sortBy: 'last modified',
            sortOrder: 'descending',
            firstLoad: true,

            showFilter: false,
            searchtext: '',
            isFiltered: false,
            searchPref: {
                title: true,
                tags: true,
                content: true
            }
        }
        this.props.receiveEvents();
    }

    sortTypes = 
        {'created': 'createdAt',
        'last modified': 'lastModifiedAt',
        'notebook': 'notebook',
        'note name': 'title'}

    sortOrders = [
        'ascending',
        'descending'
    ];

    componentDidMount() {
        if (this.props.location.search) {
            const query = queryString.parse(this.props.location.search);
            if (query && query.q) {
                if (query.q.startsWith('tags')) {
                    this.setState({
                        searchPref: {
                            title: false,
                            tags: true,
                            content: false
                        }
                    })
                }
                this.setState({
                    searchtext: query.q,
                    isFiltered: true
                })
            }
        }

        if(this.state.firstLoad && this.props.authorization.isAuth) {
            this.initializeNotes(this.props.authorization);
            this.setState({firstLoad: false})
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.firstLoad && nextProps.authorization) {
            this.initializeNotes(nextProps.authorization);
            this.setState({firstLoad: false})
        }

        if (nextProps.event && nextProps.event.name === 'noteListRefreshed') {
            this.applyFilter();
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
                that.setState({items: response.data, searchResults: response.data, view: response.data});
                if (that.state.isFiltered) {
                    that.search();
                } else {
                    that.props.sendEvent('noteListRefreshed', true);
                }
                
                const existingNotebookList = [];
                response.data.map(item => existingNotebookList.push(item.notebook))

                that.setState({
                    existingNotebookList: [...new Set(existingNotebookList)]
                });

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
            existingNotebook: '',
            newNotebook: ''
        })
    }

    toggleFilter = () => {
        this.setState({showFilter: !this.state.showFilter});
    }

    clearSearch = () => {
        this.setState({
            searchResults: this.state.items,
            isFiltered: false,
            searchtext: ''
        }, () => this.props.sendEvent('noteListRefreshed', true))
        this.props.sendEvent('sidebar', false);
    }

    search = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (isEmptyOrSpaces(this.state.searchtext)) {
            this.setState({
                searchResults: this.state.items,
                isFiltered: false
            }, () => this.props.sendEvent('noteListRefreshed', true));
            return;
        }

        const searchResults = this.state.items.filter((item) => {
            if (this.state.searchPref.title && match(item.title, this.state.searchtext)) {
                return true;
            } else if (this.state.searchPref.tags && match(item.tags, this.state.searchtext)) {
                return true;
            } else if (this.state.searchPref.content && match(item.content, this.state.searchtext)) {
                return true;
            }
        });
        let selectedNoteId = null;
        if (searchResults.length > 0) {
            selectedNoteId = searchResults[0]._id;
        }
        this.setState({
            searchResults: searchResults,
            isFiltered: true,
            selectedNoteId: selectedNoteId
        }, () => this.props.sendEvent('noteListRefreshed', true));
        this.props.sendEvent('sidebar', false)
    }

    applyFilter = () => {
        const notebookList = [];
        let noteList = [];
        this.state.searchResults.map(item => {
            if (isEmptyOrSpaces(this.state.notebookFilter) || this.state.notebookFilter === 'all notebooks' || item.notebook === this.state.notebookFilter) {
                noteList.push(item);
            }
            notebookList.push(item.notebook);
        });

        noteList = sort(noteList, this.sortTypes[this.state.sortBy], this.state.sortOrder === 'descending' ? true : false);

        let selectedNoteId = '';
        if (noteList && noteList.length > 0) {
            selectedNoteId = noteList[0]._id;
        }

        this.setState({
            selectedNoteId: selectedNoteId,
            view: noteList,
            filteredNotebookList: [...new Set(notebookList)]
        });
    }

    toggleSearchPref = (pref) => {
        this.setState({
            searchPref: {
                ...this.state.searchPref,
                [pref]: !this.state.searchPref[pref]
            }
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

    saveNoteEvent = () => {
        let notebook = this.state.existingNotebook;
        if (notebook === '<create new>') {
            notebook = this.state.newNotebook;
        }
        this.saveNote({
            id: null,
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags,
            notebook: notebook
        });
    }

    saveNote = (note, edit=false) => {

        const that = this;

        if (!note) {
            that.props.sendEvent('notification', true, {type: 'failure', message: 'Unknown error', duration: 5000});
            return;
        }

        if (isEmptyOrSpaces(note.notebook)) {
            that.props.sendEvent('notification', true, {type: 'failure', message: 'Notebook not chosen', duration: 5000});
            return;
        }

        if (isEmptyOrSpaces(note.title)) {
            that.props.sendEvent('notification', true, {type: 'failure', message: 'Note name / title missing', duration: 5000});
            return;
        }

        if (isEmptyOrSpaces(note.tags)) {
            note.tags = 'unsorted';
        }

        axios.put(baseUrl + constants.API_URL_NOTE, {
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags,
            notebook: note.notebook
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
                [event.target.name]: event.target.value
            }
        )
    }

    handleNotebookFilterChange = (event) => {
        this.setState(
        {
            [event.target.name]: event.target.value
        },
        () => this.applyFilter());
    }

    render() {
        const noteview = this.state.view.map(item => (
            <div key={item._id}>
                {item._id === this.state.selectedNoteId && 
                        <Link key={item._id} id={item._id} note={item} saveNote={this.saveNote} deleteNote={this.deleteNote} event={this.props.event} notebooks={this.state.existingNotebookList}/>}
            </div>
        ))
        const listNoteRef = this.state.view.map(item => (
            <div key={item._id}>
                <NoteRef selected={this.state.selectedNoteId === item._id ? true : false} id={item._id} note={item} selectNote={this.selectNote} />
            </div>
        ))
        return (
            <div className="notes">
                <ArcDialog title="Add Note" visible={this.state.isAddDialogOpen} toggleVisibility={this.toggleAddDialog}>
                    <div><ArcSelect label="Notebook" data={this.state} id="existingNotebook" handleChange={e => this.handleChange(e)} elements={this.state.existingNotebookList} firstAction="<create new>" /></div>
                    <div>
                    {this.state.existingNotebook === '<create new>' && <ArcTextField label="Notebook name" data={this.state} id="newNotebook" handleChange={e => this.handleChange(e)} />}
                    </div>
                    <div><ArcTextField label="Title" data={this.state} id="title" handleChange={e => this.handleChange(e)} /></div>
                    <div><ArcTextField label="Tags (separated by blank spaces)" data={this.state} id="tags" handleChange={e => this.handleChange(e)} /></div>
                    <div><ArcTextField label="Content (Markdown / HTML / Plaintext)" data={this.state} id="content" multiline handleChange={e => this.handleChange(e)} /></div>
                    <div className="actions">
                        <button onClick={this.toggleAddDialog} className="default disabled left"><i className="material-icons">close</i>Cancel</button>
                        <button onClick={this.saveNoteEvent} className="primary animate right"><i className="material-icons">double_arrow</i>Save</button>
                    </div>
                </ArcDialog>

                <ViewResolver event={this.props.event} sendEvent={this.props.sendEvent} sideLabel='More options'>
                    <View main>
                        {noteview}
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="section-main">
                                <div className="actionbar-2 space-top-2">
                                    <div>
                                        <button onClick={this.newNote} className="primary animate">
                                            <i className="material-icons">add</i>New Note
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={this.toggleFilter} className={this.state.isFiltered ? "default block" : "default disabled"}>
                                            {!this.state.showFilter && <><i className="material-icons">expand_more</i>Filter</>}
                                            {this.state.showFilter && <><i className="material-icons">expand_less</i>Filter</>}
                                        </button>
                                    </div>
                                </div>

                                <div className={this.state.showFilter ? "filter show" : "filter hide"}>
                                    <div className="typography-4 space-top-1">Keywords separated by space</div>
                                    <form method="GET" onSubmit={this.search} noValidate>
                                        <ArcTextField label="Keywords" id="searchtext" data={this.state} handleChange={e => this.handleChange(e)} />
                                    </form>
                                    <div className="typography-5 space-top-2">
                                        <Switch
                                            checked={this.state.searchPref.title}
                                            onChange={() => this.toggleSearchPref('title')}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                        Include title
                                    </div>
                                    <div className="typography-5 space-top-2">
                                        <Switch
                                            checked={this.state.searchPref.tags}
                                            onChange={() => this.toggleSearchPref('tags')}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                        Include tags
                                    </div>
                                    <div className="typography-5 space-top-2">
                                        <Switch
                                            checked={this.state.searchPref.content}
                                            onChange={() => this.toggleSearchPref('content')}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                        Include Content
                                    </div>
                                    {this.state.isFiltered && <div className="typography-4 space-top-2">Found {this.state.searchResults.length} notes matching the search criteria</div>}
                                    <div className="actionbar-2 space-top-2 space-bottom-2">
                                        <div>
                                            <button onClick={this.clearSearch} className="default">Clear</button>
                                        </div>
                                        <div>
                                            <button onClick={this.search} className="default animate space-right-2">Search</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="actionbar-3 space-top-2 space-bottom-1">
                                    <div><ArcSelect label="Notebook" data={this.state} id="notebookFilter" handleChange={e => this.handleNotebookFilterChange(e)} elements={this.state.filteredNotebookList} first='all notebooks' /></div>
                                    <div><ArcSelect label="Sort by" data={this.state} id="sortBy" handleChange={e => this.handleNotebookFilterChange(e)} elements={Object.keys(this.sortTypes)} /></div>
                                    <div><ArcSelect label="Sort Order" data={this.state} id="sortOrder" handleChange={e => this.handleNotebookFilterChange(e)} elements={this.sortOrders} /></div>
                                </div>
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