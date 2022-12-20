import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';

const AlarmForm = (props) => {
    const formItems = props.fields.map(field => FormItem(field));
    return (
        <form>
            { formItems }
            <Button variant='contained' onClick={props.handleAddAlarm}>Add</Button>
        </form>
    );
}

const FormItem = (field) => {
    const [value, setValue] = useState('');
    const options = [...Array(field.max - field.min + 1).keys()].map(i => (<MenuItem key={i + field.min} value={i + field.min}>{i + field.min}</MenuItem>));
    return (
        <FormControl fullWidth key={field.name}>
            <InputLabel id={`${field.name}`}>
                {field.name}
            </InputLabel>
            <Select value={value} label={field.name} onChange={(e)=>setValue(e.target.value)}>
                {options}
            </Select>
        </FormControl>
    );
}

AlarmForm.propTypes = {
    handleAddAlarm: PropTypes.func,
    fields: PropTypes.array,
}

export default AlarmForm