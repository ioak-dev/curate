import React, { Component } from 'react';
import PropTypes from 'prop-types';

class View extends Component {
    constructor(props) {
        console.log(props);
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

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