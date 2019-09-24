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

const baseUrl = process.env.REACT_APP_API_URL;

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            view: [],
            isEditDialogOpen: false,

            id: null,
            title: '',
            href: '',
            description: '',
            tags: '',
            editDialogLabel: 'Add'
        }
    }
    componentDidMount() {
        if(this.props.authorization.isAuth) {
            this.initializeBookmarks(this.props.authorization);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.authorization) {
            this.initializeBookmarks(nextProps.authorization);
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

    searchBookmarksByTags = () =>{
        const that = this;
        axios.get(baseUrl + constants.API_URL_BOOKMARK,
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
                        <button onClick={this.toggleEditDialog} className="default disabled">Cancel</button>
                        <button onClick={this.addBookmark} className="primary animate out down">{this.state.editDialogLabel}</button>
                    </div>
                </ArcDialog>

                <ViewResolver event={this.props.event}>
                    <View main>
                        <button onClick={this.toggleEditDialog} className="primary animate in down space-bottom-1">Add Bookmark</button>
                        {listview}
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="section-main">
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton icon="add" leftLabel="ioak"/>
                                <ActionButton type="select" icon="remove" leftLabel="curate"/>
                                <ActionButton type="select" icon="remove" leftLabel="protekt"/>
                                <ActionButton icon="add" leftLabel="proteus"/>




                                
                                {/* <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/>
                                <div className="typography-2">Filter by Tag</div>
                                <ActionButton leftLabel="+ ioak"/>
                                <ActionButton leftLabel="+ curate"/>
                                <ActionButton leftLabel="+ protekt"/>
                                <ActionButton leftLabel="+ proteus"/> */}

                                <div className="typography-2 space-top-2">Search</div>
                                <ArcTextField label="Search text" id="serachtext" data={this.state} handleChange={e => this.handleChange(e)} />
                            </div>
                            <div className="section-footer">
                                <div>
                                    <button onClick={this.toggleEditDialog} className="default disabled small">Clear</button>
                                </div>
                                <div>
                                    <button onClick={this.searchBookmarksByTags} className="default animate in left small">Apply</button>
                                </div>
                            </div>
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
