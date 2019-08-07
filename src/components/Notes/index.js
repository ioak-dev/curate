import React from 'react';
import Bookmarks from '../Bookmarks';

export default class Notes extends React.Component {
  render() {
    return (
      <div>
          <Bookmarks {...this.props} />
      </div>
    );
  }
}