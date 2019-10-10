import React from 'react';
import PropTypes from 'prop-types';
import { getProfile, setProfile, persistProfile } from '../../actions/ProfileActions';
import './style.scss';
import View from '../Ux/View';
import ViewResolver from '../Ux/ViewResolver';
import { Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import {withCookies} from 'react-cookie';
import { importBookmarks } from '../Bookmarks/BookmarkService';
import ArcTextField from '../Ux/ArcTextField';
import { isEmptyOrSpaces } from '../Utils';
import {signin, updateUserDetails} from '../Auth/AuthService';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      repeatPassword: ''
    }
    this.props.receiveEvents();
  }

  componentDidMount() {
    this.setState({
      name: this.props.cookies.get('name'),
      email: this.props.cookies.get('email')
    })
  }

  handleChange = (event) => {
    this.setState(
        {
            [event.currentTarget.name]: event.currentTarget.value
        }
    )
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

  changePassword = () => {
    if (isEmptyOrSpaces(this.state.oldPassword)) {
      this.props.sendEvent('notification', true, {message: 'Old password not provided', type: 'failure', duration: 5000});
      return;
    }

    if (isEmptyOrSpaces(this.state.newPassword) || isEmptyOrSpaces(this.state.repeatPassword)) {
      this.props.sendEvent('notification', true, {message: 'New password not provided', type: 'failure', duration: 5000});
      return;
    }

    if (this.state.newPassword !== this.state.repeatPassword) {
      this.props.sendEvent('notification', true, {message: 'New password not provided', type: 'failure', duration: 5000});
      return;
    }

    // Check if old password is correctly entered
    this.checkOldPassword('oldpassword');

    //this.updateUserDetailsImpl('password');

  }

  checkOldPassword = (type) => {
    signin({
      email: this.state.email,
      password: this.state.oldPassword
    })
        .then((response) => {
          if (response.status === 200) {
            this.props.sendEvent('notification', true, {message: 'Signed In successfully', type: 'success', duration: 3000});
            this.updateUserDetailsImpl('password');
          }else  if (response.status === 401) {
            this.props.sendEvent('notification', true, {message: 'Incorrect oldpassword', type: 'failure', duration: 3000});
          }
        })
        .catch((error) => {
          this.props.sendEvent('notification', true, {'type': 'failure', message: 'Unknown error. Please try again or at a later time', duration: 3000});
        })
  }



  updateUserDetails = () => {
    if (isEmptyOrSpaces(this.state.name)) {
      this.props.sendEvent('notification', true, {message: 'Name not provided', type: 'failure', duration: 5000});
      return;
    }

    if (isEmptyOrSpaces(this.state.email)) {
      this.props.sendEvent('notification', true, {message: 'Email not provided', type: 'failure', duration: 5000});
      return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
      this.props.sendEvent('notification', true, {type: 'failure', message: 'Email ID is invalid', duration: 3000});
      return;
    }

    this.updateUserDetailsImpl('user');

  }

  updateUserDetailsImpl = (type) => {
    updateUserDetails({
      name: this.state.name,
      email: this.state.email,
      password: this.state.newPassword
    }, this.props.authorization.token, type)
    .then((response) => {
      if (response.status === 201) {
        if (type === 'password') {
          this.props.sendEvent('notification', true, {message: 'Password updated successfully', type: 'success', duration: 3000});
        } else{
          this.props.cookies.set('name', this.state.name);
          this.props.cookies.set('email', this.state.email);
          this.props.sendEvent('notification', true, {message: 'User account updated successfully', type: 'success', duration: 3000});
        }
      } else {
        this.props.sendEvent('notification', true, {'type': 'failure', message: 'Unknown error. Please try again or at a later time', duration: 3000});
      }
    })
    .catch((error) => {
        this.props.sendEvent('notification', true, {'type': 'failure', message: 'Unknown error. Please try again or at a later time', duration: 3000});
    })
  }

  fileChoosen = (event) => {
    event.preventDefault();
    const that = this;
    var reader = new FileReader();
    that.props.sendEvent('spinner');
    reader.onload = function(event) {
      importBookmarks({
        content: event.target.result
      }, that.props.authorization.token)
      .then(function(response) {
        that.props.sendEvent('notification', true, {message: 'Imported (' + response.data.length + ') bookmarks successfully', type: 'success', duration: 6000});
      });
    }
    reader.readAsText(event.target.files[0]);
    event.target.value = '';
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

          <div className="typography-3 space-top-4">User Account</div>
          <div><ArcTextField label="Name" data={this.state} id="name" handleChange={e => this.handleChange(e)} /></div>
          <div><ArcTextField label="Email" data={this.state} id="email" handleChange={e => this.handleChange(e)} /></div>
          <div><button className="secondary animate space-top-1" onClick={this.updateUserDetails}>Update details</button></div>

          <div className="typography-3 space-top-4">Password</div>
          <div><ArcTextField type="password" label="Old Password" data={this.state} id="oldPassword" handleChange={e => this.handleChange(e)} /></div>
          <div><ArcTextField type="password" label="New Password" data={this.state} id="newPassword" handleChange={e => this.handleChange(e)} /></div>
          <div><ArcTextField type="password" label="Repeat New Password" data={this.state} id="repeatPassword" handleChange={e => this.handleChange(e)} /></div>
          <div><button className="secondary animate space-top-1" onClick={this.changePassword}>Change Password</button></div>
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
