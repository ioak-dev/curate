import React from 'react';
import PropTypes from 'prop-types';
import { getProfile, setProfile, persistProfile } from '../../actions/ProfileActions';
import './style.scss';
import View from '../Ux/View';
import ViewResolver from '../Ux/ViewResolver';
import { Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';
import Canvas from '../Canvas';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.props.receiveEvents();
  }

  toggleDarkMode = () => {
      if (this.props.profile.theme === 'theme_dark') {
          this.props.persistProfile(this.props.authorization, {
              ...this.props.profile,
              theme: 'theme_light'
          })   
      } else  {
          this.props.persistProfile(this.props.authorization, {
              ...this.props.profile,
              theme: 'theme_dark'
          })   
      }
  }

  changeTextSize = (size) => {
      this.props.persistProfile(this.props.authorization, {
          ...this.props.profile,
          textSize: size
      })
  }

  changeThemeColor = (color) => {
      this.props.persistProfile(this.props.authorization, {
          ...this.props.profile,
          themeColor: color
      })
  }

  fileChoosen = (event) => {
    event.preventDefault();
    var reader = new FileReader();
    reader.onload = function(event) {
      console.log(event.target.result);
    }
    reader.readAsText(event.target.files[0]);
  }

  render() {
    return (
      <div className="settings">
        <ViewResolver event={this.props.event} sendEvent={this.props.sendEvent} sideLabel='More options'>
          <View main>
          <div className="typography-3">Import Bookmarks</div>
          <div className="space-top-2 space-left-2">
            <label className="file-upload">
              <input type="file" name="file" onChange={this.fileChoosen} />
              Import
            </label>
          </div>

          
          <div className="typography-3 space-top-4">Export Bookmarks</div>
          <div className="space-top-2"><button className="secondary animate space-left-2">Export</button></div>

          
          <div className="typography-3 space-top-4">Appearance</div>
          <div className="appearance">
            <div className="typography-5">Dark mode</div>
            <div>
                <Switch
                checked={this.props.profile.theme === 'theme_dark'}
                onChange={this.toggleDarkMode}
                inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </div>
            
            <div className="typography-5 space-bottom-2">Text Size</div>
            <div className=" space-bottom-2">
              <div className={"text-size size-1 space-right-1 " + (this.props.profile.textSize === 'textsize_tiny' ? 'active' : '')}  onClick={() => this.changeTextSize('textsize_tiny')}>Az</div>
              <div className={"text-size size-2 space-right-1 " + (this.props.profile.textSize === 'textsize_small' ? 'active' : '')}  onClick={() => this.changeTextSize('textsize_small')}>Az</div>
              <div className={"text-size size-3 space-right-1 " + (this.props.profile.textSize === 'textsize_medium' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_medium')}>Az</div>
              <div className={"text-size size-4 " + (this.props.profile.textSize === 'textsize_large' ? 'active' : '')} onClick={() => this.changeTextSize('textsize_large')}>Az</div>
            </div>
            

            
            
            <div className="typography-5">Color Scheme</div>
            <div>
              <div className="theme-color color-1" onClick={() => this.changeThemeColor('themecolor_1')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_1' && 'check'}</i></div>
              <div className="theme-color color-2" onClick={() => this.changeThemeColor('themecolor_2')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_2' && 'check'}</i></div>
              <div className="theme-color color-3" onClick={() => this.changeThemeColor('themecolor_3')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_3' && 'check'}</i></div>
              <div className="theme-color color-4" onClick={() => this.changeThemeColor('themecolor_4')}><i className="material-icons">{this.props.profile.themeColor === 'themecolor_4' && 'check'}</i></div>
            </div>
          </div>

          <div className="typography-3 space-top-4">Canvas Fabric</div>
          <div><Canvas width={900} height={900}/></div>
          </View>
        </ViewResolver>
      </div>
    );
  }
}

Settings.propTypes = {
  sendEvent: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired
}



const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfile, setProfile, persistProfile })(withCookies(Settings));