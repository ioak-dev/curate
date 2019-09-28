import React from 'react';
import PropTypes from 'prop-types';
import './ArcSelect.scss';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function ArcSelect(props) {
    const classes = useStyles();

    const { id, label, elements, handleChange, error, data, first,firstAction,  ...rest } = props;
    const elementsView = elements.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>);
    return (
        <>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
            value={data[id]}z
            onChange={e => handleChange(e)}
            inputProps={{
                name: id,
                id: id,
            }}
            autoWidth
            >
                {first && <MenuItem value={first}>{first}</MenuItem>}
                {firstAction && <MenuItem value={firstAction}><em>{firstAction}</em></MenuItem>}
                {elementsView}
            </Select>
        </FormControl>
        </>
    )
}

ArcSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    data: PropTypes.object.isRequired,
    elements: PropTypes.array.isRequired,
    first:  PropTypes.string,
    firstAction:  PropTypes.string
}

export default ArcSelect;