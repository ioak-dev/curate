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

interface Props {
  updateUserDetailsImpl: Function;
  authorization: Authorization;
  cookies: any;
}

const UserDetails = (props: Props) => {
  const [data, setData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    setData({
      ...data,
      name: props.cookies.get('name'),
      email: props.cookies.get('email'),
    });
  }, []);

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const updateUserDetailsAction = () => {
    if (isEmptyOrSpaces(data.name)) {
      sendMessage('notification', true, {
        message: 'Name not provided',
        type: 'failure',
        duration: 5000,
      });
      return;
    }

    if (isEmptyOrSpaces(data.email)) {
      sendMessage('notification', true, {
        message: 'Email not provided',
        type: 'failure',
        duration: 5000,
      });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Email ID is invalid',
        duration: 3000,
      });
      return;
    }

    props.updateUserDetailsImpl(data, 'user');
  };

  return (
    <>
      <div className="typography-3 space-top-4">User Account</div>
      <div>
        <OakText
          label="Name"
          data={data}
          id="name"
          handleChange={e => handleChange(e)}
        />
      </div>
      <div>
        <OakText
          label="Email"
          data={data}
          id="email"
          handleChange={e => handleChange(e)}
        />
      </div>
      <div>
        <OakButton
          theme="secondary"
          variant="animate in"
          action={() => updateUserDetailsAction()}
        >
          Update details
        </OakButton>
      </div>
    </>
  );
};

export default withCookies(UserDetails);
