import React from 'react';
import Bookmarks from '../Bookmarks';
import Navigation from '../Navigation';

export default class Notes extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <div>
            <Bookmarks {...this.props} />
        </div>
      </>
    );
  }
}