import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';

const AlarmForm = (props) => {
    const formItems = Object.keys(props.formFields).map((name) => FormItem(name, props.formFields[name], props.handleChangeAlarm));
    return (
        <form>
            { formItems }
            <Button variant='contained' onClick={props.handleAddAlarm}>Add</Button>
        </form>
    );
}

const FormItem = (name, field, handleChangeAlarm) => {
    const options = [...Array(field.max - field.min + 1).keys()].map(i => (<MenuItem key={i + field.min} value={i + field.min}>{i + field.min}</MenuItem>));
    return (
        <FormControl fullWidth key={name}>
            <InputLabel id={`${name}`}>
                {name}
            </InputLabel>
            <Select value={field.value} label={field.name} onChange={(e) => handleChangeAlarm(name, e.target.value)}>
                {options}
            </Select>
        </FormControl>
    );
}

AlarmForm.propTypes = {
    handleAddAlarm: PropTypes.func,
    handleChangeAlarm: PropTypes.func,
    formFields: PropTypes.object,
}

export default AlarmForm