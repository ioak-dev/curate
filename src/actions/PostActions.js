import { GET_POSTS, ADD_POST } from '../actions/types';

export const getPosts = () => dispatch => {
    console.log('action');
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => dispatch({
            type: GET_POSTS,
            payload: data
        }));
}

export const addPost = (postData) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => dispatch({
            type: ADD_POST,
            payload: data
        }));
}