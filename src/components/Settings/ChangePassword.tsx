import React, { useState, useEffect } from 'react';
import {
  getProfile,
  setProfile,
  persistProfile,
} from '../../actions/ProfileActions';
import './style.scss';
import View from '../../oakui/View';
import ViewResolver from '../../oakui/ViewResolver';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { isEmptyOrSpaces } from '../Utils';
import { signin, updateUserDetails, preSignin } from '../Auth/AuthService';
import { Authorization, Profile } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';
import BookmarkImport from './BookmarkImport';
import BookmarkExport from './BookmarkExport';
import Appearance from './Appearance';
import UserDetails from './UserDetails';

interface Props {
  authorization: Authorization;
  email: string;
  updateUserDetailsImpl: Function;
}

const ChangePassword = (props: Props) => {
  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const changePassword = () => {
    if (isEmptyOrSpaces(data.oldPassword)) {
      sendMessage('notification', true, {
        message: 'Old password not provided',
        type: 'failure',
        duration: 5000,
      });
      return;
    }

    if (
      isEmptyOrSpaces(data.newPassword) ||
      isEmptyOrSpaces(data.repeatPassword)
    ) {
      sendMessage('notification', true, {
        message: 'New password not provided',
        type: 'failure',
        duration: 5000,
      });
      return;
    }

    if (data.newPassword !== data.repeatPassword) {
      sendMessage('notification', true, {
        message: 'New password not provided',
        type: 'failure',
        duration: 5000,
      });
      return;
    }

    checkOldPassword('oldpassword');
  };

  const checkOldPassword = type => {
    preSignin(props.email).then(response => {
      if (response.status === 200) {
        signin(
          {
            email: props.email,
            password: data.oldPassword,
          },
          response.data
        )
          .then(response => {
            if (response.status === 200) {
              props.updateUserDetailsImpl(
                {
                  password: data.newPassword,
                },
                'password'
              );
              // sendMessage('notification', true, {message: 'Passphrase updated successfully', type: 'success', duration: 3000});
            } else if (response.status === 401) {
              sendMessage('notification', true, {
                message: 'Incorrect passphrase',
                type: 'failure',
                duration: 3000,
              });
            } else {
              sendMessage('notification', true, {
                message:
                  'Unknown response from server. Please try again or at a later time',
                type: 'failure',
                duration: 3000,
              });
            }
          })
          .catch(error => {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Unknown error. Please try again or at a later time',
              duration: 3000,
            });
          });
      }
    });
  };

  return (
    <>
      <div className="typography-3 space-top-4">Password</div>
      <div>
        <OakText
          type="password"
          label="Old Password"
          data={data}
          id="oldPassword"
          handleChange={e => handleChange(e)}
        />
      </div>
      <div>
        <OakText
          type="password"
          label="New Password"
          data={data}
          id="newPassword"
          handleChange={e => handleChange(e)}
        />
      </div>
      <div>
        <OakText
          type="password"
          label="Repeat New Password"
          data={data}
          id="repeatPassword"
          handleChange={e => handleChange(e)}
        />
      </div>
      <div>
        <OakButton
          theme="secondary"
          variant="animate in"
          action={() => changePassword()}
        >
          Change Password
        </OakButton>
      </div>
    </>
  );
};

export default ChangePassword;
