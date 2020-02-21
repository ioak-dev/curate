import React, { Component } from 'react';
import './style.scss';
import OakPrompt from '../Ux/OakPrompt';

interface Props {
    editBookmark: Function,
    deleteBookmark: Function,
    searchByTag: Function,
    bookmark: any,
    id: string
}
interface State {
}

class Link extends Component<Props, State> {

    state = {
        showDeletePrompt: false
    }

    toggleDeletePrompt = () => {
        this.setState ({
            showDeletePrompt: !this.state.showDeletePrompt
        })
    }

    edit = () => {
        this.props.editBookmark(this.props.bookmark);
    }

    delete = () => {
        this.props.deleteBookmark(this.props.id);
    }

    render() {
        const tags: any = [];
        if (this.props.bookmark.tags) {
            this.props.bookmark.tags.split(" ").map(item => {
                tags.push(<div className="tag" key={item} onClick={() => this.props.searchByTag(item)}>{item}</div>);
            })
        }
        
        return (
            <div>
                <OakPrompt visible={this.state.showDeletePrompt} toggleVisibility={this.toggleDeletePrompt} action={this.delete} text="Are you sure, you want to delete the bookmark?" />
                <div className="title typography-4">{this.props.bookmark.title}
                    <div className="action-icon">
                        <i onClick={this.edit} className="material-icons">edit</i>
                        <i onClick={this.toggleDeletePrompt} className="material-icons">delete</i>
                    </div>
                </div>
                <div className="url typography-6"><a target="_blank" rel="noopener noreferrer" href={this.props.bookmark.href}>{this.props.bookmark.href}</a></div>
                <div className="timestamp typography-6 space-bottom-1">{this.props.bookmark.createdAt}</div>
                {tags}
            </div>
        )
    }
}

export default Link;
