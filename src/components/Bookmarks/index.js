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

const baseUrl = process.env.REACT_APP_API_URL;

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            items: [],
            showAddDialog: false
        }
        this.toggleAddDialog = this.toggleAddDialog.bind(this);
        this.addBookmark = this.addBookmark.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                that.setState({items: response.data});
            }
        );
    }

    toggleAddDialog() {
        this.setState({
            showAddDialog: !this.state.showAddDialog
        })
    }

    addBookmark() {
        const that = this;
        axios.put(baseUrl + constants.API_URL_BOOKMARK, {
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
                that.toggleAddDialog();
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                that.props.logout(null, 'failure', 'Session expired. Login again');
            }
        })
    }

    handleChange(event) {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    }

    render() {
        const listview = this.state.items.map(item => (
            <div key={item._id}>
            <Link id={item._id} title={item.title} description={item.description} href={item.href} tags={item.tags} />
            <br />
            </div>
        ))
        return (
            <div className="boxed">
                
                <button onClick={this.toggleAddDialog} className="primary animate in down">Add New Bookmark</button>
                <ArcDialog title="Add Bookmark" visible={this.state.showAddDialog} toggleVisibility={this.toggleAddDialog}>
                    <ArcTextField label="Title" id="title" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="URL" id="href" handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Description" id="description" multiline rows='5' handleChange={e => this.handleChange(e)} />
                    <ArcTextField label="Tags" id="tags" handleChange={e => this.handleChange(e)} />
                    <div className="actions">
                        <button onClick={this.toggleAddDialog} className="default disabled">Cancel</button>
                        <button onClick={this.addBookmark} className="primary animate out down">Add</button>
                    </div>
                </ArcDialog>
                {listview}
            </div>
        )
    }
}

Bookmarks.propTypes = {
    receiveEvents: PropTypes.func.isRequired,
    sendEvent: PropTypes.func.isRequired,
}

export default Bookmarks;