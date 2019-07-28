import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function ArcTextField(props) {
    const { id, label, value, handleChange, error, rows, multiline, ...rest } = props;
    return (
        <TextField
                id={id}
                label={label}
                name={id}
                value={value}
                onChange={e => handleChange(e)}
                margin="normal"
                variant="standard"
                fullWidth
                error={error}
                multiline={multiline}
                rows={rows}
                {...rest}
                />
    )
}

ArcTextField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    error: PropTypes.bool
};

export default ArcTextField;
