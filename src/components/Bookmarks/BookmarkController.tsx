import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { isEmptyOrSpaces, match } from '../Utils';
import { sendMessage } from '../../events/MessageService';
import { Authorization } from '../Types/GeneralTypes';
import { fetchBookmark,  saveBookmark, deleteBookmark } from '../../actions/BookmarkActions';
import BookmarkView from './BookmarkView';

const queryString = require('query-string');

interface Props {
    authorization: Authorization
    location: any,
    logout: Function,

    fetchBookmark: Function,
    saveBookmark: Function,
    deleteBookmark: Function,
    bookmark: any
}

interface State {
    view: any,
    isFiltered: boolean,
    data: any,
    firstLoad: boolean
}
class BookmarkController extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            view: [],

            isFiltered: false,
            data: {
                bookmark: {
                    id: undefined,
                    title: '',
                    href: '',
                    tags: ''
                },
                searchPref: {
                    title: true,
                    tags: true,
                    href: true,
                    content: true,
                    searchtext: ''
                }
            },
            firstLoad: true
        }
    }

    componentDidMount() {
        if (this.props.location.search) {
            const query = queryString.parse(this.props.location.search);
            if (query && query.q) {
                if (query.q.startsWith('tags')) {
                    this.setState({
                        data: {
                            bookmark: {
                                id: undefined,
                                title: '',
                                href: '',
                                tags: '',
                            },
                            searchPref: {
                                title: false,
                                tags: true,
                                href: true,
                                content: false
                            }
                        }
                    })
                }
                this.setState({
                    data: {
                        ...this.state.data,
                        searchtext: query.q,
                    },
                    isFiltered: true
                })
            }
        }

        if(this.state.firstLoad && this.props.authorization.isAuth) {
            this.props.fetchBookmark(this.props.authorization);
            this.setState({firstLoad: false})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authorization && nextProps.authorization !== this.props.authorization) {
            this.props.fetchBookmark(nextProps.authorization);
            this.setState({firstLoad: false})
        }
        if (nextProps?.bookmark?.items !== this.props?.bookmark?.items) {
            if (this.state.isFiltered) {
                this.search();
            } else {
                this.setState({
                    view: nextProps.bookmark.items
                })
            }
        }
    }

    selectBookmark = (bookmark) => {
        this.setState({
            data: {
                ...this.state.data,
                bookmark: {
                    id: bookmark ? bookmark._id : '',
                    title: bookmark ? bookmark.title : '',
                    href: bookmark ? bookmark.href : '',
                    tags: bookmark ? bookmark.tags : ''
                }
            }
        })
    }

    delete = (bookmarkId) => {
        this.props.deleteBookmark(this.props.authorization, bookmarkId);
    }

    clearSearch = () => {
        this.setState({
            view: this.props.bookmark?.items,
            isFiltered: false,
            data: {
                ...this.state.data,
                searchPref: {
                    ...this.state.data.searchPref,
                    searchtext: ''
                }
            }
        })
        sendMessage('sidebar', false)
    }

    searchByTag = (tagName) => {
        
        this.setState({
            data: {
                ...this.state.data,
                searchPref: {
                    ...this.state.data.searchPref,
                    title: false,
                    tags: true,
                    href: false,
                    searchtext: tagName
                }
            },
            isFiltered: true
        }, () => this.search());
    }

    search = (event?: any) => {
        if (event) {
            event.preventDefault();
        }

        if (isEmptyOrSpaces(this.state.data.searchPref.searchtext)) {
            this.setState({
                view: this.props.bookmark?.items,
                isFiltered: false
            });
            return;
        }

        this.setState({
            view: this.props.bookmark?.items?.filter((item) => {
                if (this.state.data.searchPref.title && match(item.title, this.state.data.searchPref.searchtext)) {
                    return true;
                } else if (this.state.data.searchPref.tags && match(item.tags, this.state.data.searchPref.searchtext)) {
                    return true;
                } else if (this.state.data.searchPref.href && match(item.href, this.state.data.searchPref.searchtext)) {
                    return true;
                }
            }),
            isFiltered: true
        });
        sendMessage('sidebar', false)
    }

    toggleSearchPref = (pref) => {
        this.setState({
            data: {
                ...this.state.data,
                searchPref: {
                    ...this.state.data.searchPref,
                    [pref]: !this.state.data.searchPref[pref]
                }
            }
        })
    }

    update = () => {

        let bookmark = {
            id: this.state.data.bookmark.id,
            title: this.state.data.bookmark.title,
            href: this.state.data.bookmark.href,
            tags: this.state.data.bookmark.tags
        }

        if (isEmptyOrSpaces(bookmark.title)) {
            sendMessage('notification', true, {type: 'failure', message: 'Title / description missing', duration: 5000});
            return;
        }

        if (isEmptyOrSpaces(bookmark.href)) {
            sendMessage('notification', true, {type: 'failure', message: 'Website URL / Link is missing', duration: 5000});
            return;
        }

        if (isEmptyOrSpaces(bookmark.tags)) {
            bookmark.tags = 'unsorted';
        }

        this.props.saveBookmark(this.props.authorization, bookmark);
    }

    handleChange = (event, domain) => {
        this.setState(
            {
                ...this.state,
                data: {
                    ...this.state.data,
                    [domain]: {
                        ...this.state.data[domain],
                        [event.currentTarget.name]: event.currentTarget.value
                    }
                }
            }
        )
    }

    render() {
        return (
            <BookmarkView handleChange={this.handleChange} data={this.state.data} selectBookmark={this.selectBookmark} update={this.update} delete={this.delete} 
            search={this.search} view={this.state.view} isFiltered={this.state.isFiltered} toggleSearchPref={this.toggleSearchPref} 
            clearSearch={this.clearSearch} searchByTag={this.searchByTag} />        )
    }
}

const mapStateToProps = state => ({
    bookmark: state.bookmark
})
  
export default connect(mapStateToProps, { fetchBookmark, saveBookmark, deleteBookmark })(BookmarkController);
