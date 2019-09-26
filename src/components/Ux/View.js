import React, { Component } from 'react';
import PropTypes from 'prop-types';

class View extends Component {
    render() {
        return (
            <div>
               {/* {this.props} */}
               {this.props.children}
            </div>
        )
    }
}

View.propTypes = {
}

export default View;