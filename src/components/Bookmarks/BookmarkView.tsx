import React, { useState, useEffect } from 'react';
import Link from './Link';
import OakDialog from '../Ux/OakDialog';
import ViewResolver from '../Ux/ViewResolver';
import View from '../Ux/View';
import './style.scss';
import { Switch } from '@material-ui/core';
import Sidebar from '../Ux/Sidebar';
import OakText from '../Ux/OakText';
import OakButton from '../Ux/OakButton';
import { receiveMessage, sendMessage } from '../../events/MessageService';

interface Props {
    selectBookmark: Function,
    deleteBookmark: Function,
    search: any,
    searchByTag: Function,
    
    bookmark: any,
    searchPref: any,
    view: any[],

    handleBookmarkDataChange: Function,
    handleSearchPrefDataChange: Function,
    toggleSearchPref: Function,
    clearSearch: Function,
    update: Function
}

const BookmarkView = (props: Props) => {
    const [editDialog, setEditDialog] = useState(false);
    
    const domain = "bookmark";    
    const sidebarElements = {
        addNew: [
            {
                label: 'New Bookmark',
                action: () => newBookmark(),
                icon: 'note_add'
            }
        ]
    };
    
    useEffect(() => {
        const eventBus = receiveMessage().subscribe(
            message => {
                if (message.name === domain && message.signal) {
                    sendMessage('notification', true, {type: 'success', message: domain + " " + message.data.action, duration: 5000});
                    if (message.data.action !== 'deleted') {
                        toggleEditDialog();
                    }
                }
            }
        );
        return () => eventBus.unsubscribe();
    })

    function newBookmark() {
        props.selectBookmark(null);
        setEditDialog(true);
    }

    function selectBookmark(item) {
        props.selectBookmark(item);
        setEditDialog(true);
    }

    function toggleEditDialog() {
        setEditDialog(!editDialog);
    }

    return (
            <div className="bookmarks">
                <OakDialog visible={editDialog} toggleVisibility={toggleEditDialog}>
                    <div className="dialog-body">
                        <OakText label="Title" data={props.bookmark} id="title" handleChange={e => props.handleBookmarkDataChange(e)} />
                        <OakText label="URL" data={props.bookmark} id="href" handleChange={e => props.handleBookmarkDataChange(e)} />
                        <OakText label="Tags" data={props.bookmark} id="tags" handleChange={e => props.handleBookmarkDataChange(e)} />
                    </div>
                    <div className="dialog-footer">
                        <OakButton action={toggleEditDialog} theme="default" variant="outline" align="left"><i className="material-icons">close</i>Cancel</OakButton>
                        <OakButton action={props.update} theme="primary" variant="animate in" align="right"><i className="material-icons">double_arrow</i>Save</OakButton>
                    </div>
                </OakDialog>

                <ViewResolver>
                    <View main>
                    {props.view.map((item: any) => (
                        <div key={item._id}>
                        <Link id={item._id} bookmark={item} editBookmark={selectBookmark} deleteBookmark={props.deleteBookmark} searchByTag={props.searchByTag} />
                        <br />
                        </div>
                    ))}
                    </View>
                    <View side>
                        <div className="filter-container">
                            <div className="section-main">
                                <Sidebar label="Add New" elements={sidebarElements['addNew']} icon="add" animate />
                                <Sidebar label="Search" elements={sidebarElements['search']} icon="search" animate number={props.searchPref.filtered ? props.view.length : undefined}>
                                    <form method="GET" onSubmit={props.search} noValidate>
                                    <div className="space-top-2 space-left-4 space-right-4"><OakText label="Keywords" id="searchText" data={props.searchPref} handleChange={e => props.handleSearchPrefDataChange(e)} /></div>
                                    </form>
                                    <div className="typography-5 space-top-2 space-left-4">
                                        <Switch
                                            checked={props.searchPref.title}
                                            onChange={() => props.toggleSearchPref('title')}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                        Include title
                                    </div>
                                    <div className="typography-5 space-top-2 space-left-4">
                                        <Switch
                                            checked={props.searchPref.tags}
                                            onChange={() => props.toggleSearchPref('tags')}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                        Include tags
                                    </div>
                                    <div className="typography-5 space-top-2 space-left-4">
                                        <Switch
                                            checked={props.searchPref.href}
                                            onChange={() => props.toggleSearchPref('href')}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                        Include URL
                                    </div>
                                    {props.searchPref.filtered && <div className="typography-4 space-top-2 space-left-2">Found {props.view.length} bookmarks matching the search criteria</div>}
                                    <div className="actionbar-2 space-top-2 space-bottom-2">
                                        <div>
                                            <OakButton action={props.clearSearch} theme="default">Clear</OakButton>
                                        </div>
                                        <div>
                                        <OakButton action={props.search} theme="primary" variant="animate in">Search</OakButton>
                                        </div>
                                    </div>

                                </Sidebar>
                            </div>
                        </div>
                    </View>
                </ViewResolver>
            </div>
    )
}
  
export default BookmarkView;
