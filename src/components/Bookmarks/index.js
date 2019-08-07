import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { TextField } from '@material-ui/core';
import Navigation from '../Navigation';
import './style.scss';
import ArcDialog from '../Ux/ArcDialog';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showAddDialog: false
        }
    }
    componentWillMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => this.setState({items: data}));
    }

    toggleAddDialog = () => {
        this.setState({
            showAddDialog: !this.state.showAddDialog
        })
    }

    addBookmark = () => {
        console.log(this.state);
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    }

    render() {
        const listview = this.state.items.map(item => (
            <div key={item.id}>
            <Link url={item.title} tags={item.body} />
            <br />
            </div>
        ))
        return (
            <div className="bookmarks boxed">
                <button onClick={this.toggleAddDialog} className="primary block">Add Bookmark</button>
                <button onClick={this.toggleAddDialog} className="secondary block">Add Bookmark</button>
                <button onClick={this.toggleAddDialog} className="block">Add Bookmark</button>
                <button onClick={this.toggleAddDialog} className="primary">Add Bookmark</button>
                <button onClick={this.toggleAddDialog} className="secondary">Add Bookmark</button>
                <button onClick={this.toggleAddDialog} className="">Add Bookmark</button>
                <ArcDialog visible={this.state.showAddDialog} toggleVisibility={this.toggleAddDialog}>
                            <TextField
                                id="outlined-uncontrolled"
                                label="Title"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="URL"
                                margin="normal"
                                name="url"
                                fullWidth
                                variant="standard"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Description"
                                margin="normal"
                                fullWidth
                                variant="standard"
                                name="description"
                                multiline
                                rows="5"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Tags"
                                margin="normal"
                                fullWidth
                                name="tags"
                                variant="standard"
                                onChange={e => this.handleChange(e)}
                            />
                        <div className="actions">
                            <button onClick={this.toggleAddDialog} className="">
                                Cancel
                            </button>
                            <button onClick={this.addBookmark} className="primary">
                                Add
                            </button>
                        </div>
                    </ArcDialog>
                {listview}
            </div>
        )
    }
}

Bookmarks.propTypes = {
    sendEvent: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    event: PropTypes.object
}

export default Bookmarks;