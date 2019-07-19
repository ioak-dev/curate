import React, { Component } from 'react';
import Link from './Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import Navigation from '../Navigation';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../../actions/PostActions';
import PropTypes from 'prop-types';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showAddDialog: false
        }
    }
    componentWillMount() {
        this.props.getPosts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost && Object.keys(nextProps.newPost).length !== 0) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    toggleAddDialog = () => {
        this.setState({
            showAddDialog: !this.state.showAddDialog
        })
    }

    addPost = () => {
        axios.post('https://jsonplaceholder.typicode.com/posts',
            {userId: 1, title: this.state.title, body: this.state.description})
        .then(response => this.toggleAddDialog());
        this.props.addPost({
            title: this.state.title,
            body: this.state.description
        });
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    }

    render() {
        const listview = this.props.posts.map(item => (
            <div key={item.id}>
            <Link url={item.title} tags={item.body} />
            <br />
            </div>
        ))
        return (
            <>
            <Navigation />
            <div className="boxed">                
                <button onClick={this.toggleAddDialog} className="primary block"><i className="material-icons">add</i>Add Post</button>
                <Dialog open={this.state.showAddDialog} onClose={this.toggleAddDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
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
                            label="Description"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            name="description"
                            multiline
                            rows="5"
                            onChange={e => this.handleChange(e)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <button onClick={this.toggleAddDialog} className="primary">
                            Cancel
                        </button>
                        <button onClick={this.addPost} className="primary block">
                            Add
                        </button>
                    </DialogActions>
                </Dialog>
                {listview}
            </div>
            </>
        )
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, { getPosts, addPost })(Posts);