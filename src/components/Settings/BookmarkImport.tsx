import React from 'react';
import './style.scss';
import { importBookmarks } from '../Bookmarks/BookmarkService';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';

interface Props {
  authorization: Authorization;
}

const BookmarkImport = (props: Props) => {
  const fileChoosen = event => {
    event.preventDefault();
    const reader = new FileReader();
    sendMessage('spinner');
    reader.onload = function(event: any) {
      importBookmarks(
        {
          content: event.target.result,
        },
        props.authorization.token
      ).then(response => {
        sendMessage('notification', true, {
          message: `Imported (${response.data.length}) bookmarks successfully`,
          type: 'success',
          duration: 6000,
        });
      });
    };
    reader.readAsText(event.target.files[0]);
    event.target.value = '';
  };

  return (
    <>
      <div className="typography-3">Import Bookmarks</div>
      <div className="space-top-2">
        <label className="file-upload">
          <input type="file" name="file" onChange={fileChoosen} />
          Import
        </label>
      </div>
    </>
  );
};

export default BookmarkImport;
