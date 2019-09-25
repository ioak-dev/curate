import React, { Component } from 'react';
import './style.scss';

class Link extends Component {
    removeTag = (tag) => {
        alert(this.props.id + ' remove ' + tag);
        console.log(this.props);
    }
    tag = (tag) => {
        alert(this.props.id + ' show results only for ' + tag);
        console.log(this.props);
    }

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
                <div className="typography-2">{this.props.bookmark.href}</div>
                <div className="typography-1 space-bottom-1">{this.props.bookmark.description}</div>
                {tags}
            </div>
        )
    }
}

export default Link;
