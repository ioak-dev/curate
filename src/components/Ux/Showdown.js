import React from 'react';
import PropTypes from 'prop-types';
import showdown  from 'showdown';
import './Showdown.scss';

function Showdown(props) {
    const converter = new showdown.Converter({tables: true});
    const html      = converter.makeHtml(props.source);
    return (
        <div className="markdown-body">
            <div dangerouslySetInnerHTML={{__html:html}} />
        </div>
    )
}

Showdown.propTypes = {
};

export default Showdown;
