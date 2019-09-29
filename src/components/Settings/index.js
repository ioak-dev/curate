import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import View from '../Ux/View';
import ViewResolver from '../Ux/ViewResolver';
import { Switch } from '@material-ui/core';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.props.receiveEvents();
  }

  render() {
    return (
      <div className="settings">
        <ViewResolver event={this.props.event} sendEvent={this.props.sendEvent} sideLabel='More options'>
          <View main>
          <div className="typography-3">Import Bookmarks</div>
          <div className="space-top-2"><button className="primary space-left-2">Import from pinboard</button></div>
          <div className="space-top-2"><button className="primary space-left-2">Import from OPML</button></div>

          
          <div className="typography-3 space-top-4">Export Bookmarks</div>
          <div className="space-top-2"><button className="primary space-left-2">Export</button></div>

          
          <div className="typography-3 space-top-4">Appearance</div>
          <div className="typography-5 space-top-2 display-inline">Dark mode
              <Switch
              checked={this.props.profile.theme === 'theme_dark'}
              onChange={this.toggleDarkMode}
              inputProps={{ 'aria-label': 'primary checkbox' }}/>
          </div>
          
          <div className="typography-5 space-top-1">Text Size
          <div className="display-inline">
              <div className={"text-size size-1 space-left-2 space-right-1 " + (this.props.profile.textSize === 'textsize_tiny' ? 'active' : '')} >Az</div>
              <div className={"text-size size-2 space-right-1 " + (this.props.profile.textSize === 'textsize_small' ? 'active' : '')} >Az</div>
              {/* <div className={"text-size size-2 space-right-1 " + (this.props.profile.textSize === 'textsize_small' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_small')}>Az</div>
              <div className={"text-size size-3 space-right-1 " + (this.props.profile.textSize === 'textsize_medium' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_medium')}>Az</div>
              <div className={"text-size size-4 " + (this.props.profile.textSize === 'textsize_large' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_large')}>Az</div> */}
          </div>
          </div>
          </View>
        </ViewResolver>
      </div>
    );
  }
}

Settings.propTypes = {
  sendEvent: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}
