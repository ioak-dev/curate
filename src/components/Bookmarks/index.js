import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import Navigation from '../Navigation';
import './style.scss';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showAddDialog: false
        }
        this.toggleAddDialog = this.toggleAddDialog.bind(this);
        this.addBookmark = this.addBookmark.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => this.setState({items: data}));
    }

    toggleAddDialog() {
        this.setState({
            showAddDialog: !this.state.showAddDialog
        })
    }

    addBookmark() {
        console.log(this.state);
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
            <div key={item.id}>
            <Link url={item.title} tags={item.body} />
            <br />
            </div>
        ))
        return (
            <>
            <Navigation />
            <div className="bookmarks boxed">
                
                <button onClick={this.toggleAddDialog} className="primary block"><i className="material-icons">add</i>Add New Bookmark</button>
                <Dialog open={this.state.showAddDialog} onClose={this.toggleAddDialog} aria-labelledby="form-dialog-title">
                    <div  className="dialog-container">
                        <DialogTitle>New Bookmark</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Provide details to create new bookmark. Use tags for better categorization
                            </DialogContentText>
                            <TextField
                                id="outlined-uncontrolled"
                                label="Title"
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                name="title"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="URL"
                                margin="normal"
                                name="url"
                                fullWidth
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="outlined-uncontrolled"
                                label="Description"
                                margin="normal"
                                fullWidth
                                variant="outlined"
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
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <button onClick={this.toggleAddDialog} className="primary">
                                Cancel
                            </button>
                            <button onClick={this.addBookmark} className="primary block">
                                Add
                            </button>
                        </DialogActions>
                    </div>
                </Dialog>
                {listview}
            </div>
            </>
        )
    }
}

Bookmarks.propTypes = {
    startSpinner: PropTypes.func.isRequired,
    stopSpinner: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

export default Bookmarks;