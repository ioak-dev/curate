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

    const { id, label, elements, objects, handleChange, error, data, first,firstAction,  ...rest } = props;
    let dropdownList = [];
    
    if (elements) {
      dropdownList = elements.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>);
    } else if (objects) {
      dropdownList = objects.map(item => <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>);
    }
    
    return (
        <>
        <FormControl className={classes.formControl} className="arc-select">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
            value={data[id]}
            onChange={e => handleChange(e)}
            inputProps={{
                name: id,
                id: id,
            }}
            autoWidth
            className={props.maxWidth ? props.maxWidth : ""}
            >
                {first && <MenuItem value={first}>{first}</MenuItem>}
                {firstAction && <MenuItem value={firstAction}><em>{firstAction}</em></MenuItem>}
                {dropdownList}
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