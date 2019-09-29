import React, { Component } from 'react';
import './style.scss';

class Link extends Component {

    edit = () => {
        this.props.editBookmark(this.props.bookmark);
    }

    delete = () => {
        this.props.deleteBookmark(this.props.id);
    }

    render() {
        const tags = [];
        if (this.props.bookmark.tags) {
            this.props.bookmark.tags.split(" ").map(item => {
                tags.push(<div className="tag" key={item}>{item}</div>);
            })
        }
        
        return (
            <div>
                <div className="typography-3">{this.props.bookmark.title}
                    <div className="action-icon">
                        <i onClick={this.edit} className="material-icons">edit</i>
                        <i onClick={this.delete} className="material-icons">delete</i>
                    </div>
                </div>
                <div className="typography-4 space-bottom-1">{this.props.bookmark.href}</div>
                {tags}
            </div>
        )
    }
}

export default Link;
