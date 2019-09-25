import React, { Component } from 'react';
import Link from './Link';
import PropTypes from 'prop-types';
import { constants } from '../Constants';
import axios from "axios";
import ArcTextField from '../Ux/ArcTextField';
import ArcDialog from '../Ux/ArcDialog';
import ViewResolver from '../Ux/ViewResolver';
import View from '../Ux/View';
import ActionButton from '../Ux/ActionButton';
import './style.scss';
import { Switch } from '@material-ui/core';

const baseUrl = process.env.REACT_APP_API_URL;

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        // console.log(props.match);
        // console.log(props.location);
        // if (window.location.search) {
        //     // alert(window.location.search);
        // }
        this.state = {
            items: [],
            view: [],
            isEditDialogOpen: false,

            searchtext: '',
            isFiltered: false,

            id: null,
            title: '',
            href: '',
            description: '',
            tags: '',
            editDialogLabel: 'Add',
            firstLoad: true,

            searchPref: {
                title: true,
                tags: true,
                href: true
            }
        }
    }
    componentDidMount() {
        if(this.state.firstLoad && this.props.authorization.isAuth) {
            this.initializeBookmarks(this.props.authorization);
            this.setState({firstLoad: false})
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.firstLoad && nextProps.authorization) {
            this.initializeBookmarks(nextProps.authorization);
            this.setState({firstLoad: false})
        }
    }

    initializeBookmarks(authorization) {
        const that = this;
        axios.get(baseUrl + constants.API_URL_BOOKMARK,
            {
                headers: {
                    Authorization: 'Bearer ' + authorization.token
                }
            })
            .then(function(response) {
                that.setState({items: response.data, view: response.data});
                if (that.state.isFiltered) {
                    that.search();
                }
            }
        );
    }

    toggleEditDialog = () => {
        this.setState({
            isEditDialogOpen: !this.state.isEditDialogOpen,
            id: null,
            title: '',
            href: '',
            description: '',
            tags: '',
            editDialogLabel: 'Add'
        })
    }

    editBookmark = (bookmark) => {
        this.setState({
            isEditDialogOpen: true,
            id: bookmark._id,
            title: bookmark.title,
            href: bookmark.href,
            description: bookmark.description,
            tags: bookmark.tags,
            editDialogLabel: 'Save'
        })
    }

    deleteBookmark = (bookmarkId) => {
        const that = this;
        axios.delete(baseUrl + constants.API_URL_BOOKMARK + "/" + bookmarkId,
        {
            headers: {
                Authorization: 'Bearer ' + this.props.authorization.token
            }
        })
        .then(function(response) {
            if (response.status === 201) {
                that.props.sendEvent('notification', true, {type: 'success', message: 'Bookmark deleted', duration: 5000});
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                that.props.logout(null, 'failure', 'Session expired. Login again');
            }
        })
    }

    clearSearch = () => {
        this.setState({
            view: this.state.items,
            isFiltered: false,
            searchtext: ''
        })
        this.props.sendEvent('sidebar', false)
    }

    search = (event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            view: this.state.items.filter((item) => {
                if (this.state.searchPref.title && this.match(item.title, this.state.searchtext)) {
                    return true;
                } else if (this.state.searchPref.tags && this.match(item.tags, this.state.searchtext)) {
                    return true;
                } else if (this.state.searchPref.href && this.match(item.href, this.state.searchtext)) {
                    return true;
                }
            }),
            isFiltered: true
        });
        this.props.sendEvent('sidebar', false)
    }

    match = (text, words) => {
        let found = false;
        if (words) {
            words.split(' ').forEach(word => {
                if (text.match(new RegExp('(\\w*'+ word +'\\w*)','gi'))) {
                    found = true;
                }
            });
        }
        return found;
    }

    toggleSearchPref = (pref) => {
        this.setState({
            searchPref: {
                ...this.state.searchPref,
                [pref]: !this.state.searchPref[pref]
            }
        })
    }

    addBookmark= () => {
        const that = this;
        axios.put(baseUrl + constants.API_URL_BOOKMARK, {
            id: this.state.id,
            title: this.state.title,
            href: this.state.href,
            description: this.state.description,
            tags: this.state.tags
        },
        {
            headers: {
                Authorization: 'Bearer ' + this.props.authorization.token
            }
        })
        .then(function(response) {
            if (response.status === 201) {
                that.props.sendEvent('notification', true, {type: 'success', message: 'Bookmark created', duration: 5000});
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
            <Link id={item._id} bookmark={item} editBookmark={this.editBookmark} deleteBookmark={this.deleteBookmark}/>
            <br />
            </div>
        ))
        return (
            <div className="bookmarks">
                <ArcDialog title="Add Bookmark" visible={this.state.isEditDialogOpen} toggleVisibility={this.toggleEditDialog}>
                    <ArcTextField label="Title" data={this.state} id="title" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="URL" data={this.state} id="href" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Description" data={this.state} id="description" multiline rows='5' handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Tags" data={this.state} id="tags" handleChange={e => this.handleChange(e)} />
                    <div className="actions">
                        <button onClick={this.toggleEditDialog} className="default disabled"><i className="material-icons">close</i>Cancel</button>
                        <button onClick={this.addBookmark} className="primary block"><i className="material-icons">check</i>{this.state.editDialogLabel}</button>
                    </div>
                </ArcDialog>

                <ViewResolver event={this.props.event} sendEvent={this.props.sendEvent}>
                    <View main>
                        <button onClick={this.toggleEditDialog} className="primary animate space-bottom-1"><i className="material-icons">add</i>Add Bookmark</button>
                        {listview}
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="section-main">
                                <div className="typography-2 space-top-2">Enter keywords separated by space</div>
                                {/* <form accept-charset="utf-8" method="GET" onSubmit={this.search} noValidate> */}
                                <form method="GET" onSubmit={this.search} noValidate>
                                    <ArcTextField label="Keywords" id="searchtext" data={this.state} handleChange={e => this.handleChange(e)} />
                                    {/* <ArcTextField label="Keywords2" id="searchtext2" data={this.state} handleChange={e => this.handleChange(e)} /> */}
                                </form>
                                <div className="typography-1 space-top-2">
                                    <Switch
                                        checked={this.state.searchPref.title}
                                        onChange={() => this.toggleSearchPref('title')}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                    Include title
                                </div>
                                <div className="typography-1 space-top-2">
                                    <Switch
                                        checked={this.state.searchPref.tags}
                                        onChange={() => this.toggleSearchPref('tags')}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                    Include tags
                                </div>
                                <div className="typography-1 space-top-2">
                                    <Switch
                                        checked={this.state.searchPref.href}
                                        onChange={() => this.toggleSearchPref('href')}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                    Include URL
                                </div>
                                {this.state.isFiltered && <div className="typography-2 space-top-2">Found {this.state.view.length} bookmarks matching the search criteria</div>}
                            </div>
                            <div className="actionbar space-top-2 space-bottom-2">
                                <div>
                                    <button onClick={this.clearSearch} className="default left">Clear</button>
                                </div>
                                <div>
                                    <button onClick={this.search} className="default animate right space-right-2">Search</button>
                                </div>
                            </div>
                            {/* <div className="section-footer">
                                <div>
                                    <button onClick={this.clearSearch} className="default disabled left">Clear</button>
                                </div>
                                <div>
                                    <button onClick={this.search} className="default animate right space-right-2">Search</button>
                                </div>
                            </div> */}
                        </div>
                    </View>
                </ViewResolver>
            </div>
        )
    }
}

Bookmarks.propTypes = {
    receiveEvents: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
}

export default Bookmarks;
