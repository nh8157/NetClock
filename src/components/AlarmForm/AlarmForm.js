import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Select, MenuItem, Button, Grid, Container, FormControl } from '@mui/material';

const AlarmForm = (props) => {
    const formItems = Object.keys(props.formFields).map((name) => FormItem(name, props.formFields[name], props.handleChangeAlarm));
    return (
        <Container>
            <Grid container spacing={2} justifyContent='space-between' alignContent='center'>
                {formItems}
                <Grid item xs={12} md={2} margin='auto'>
                    <Button variant='contained' onClick={props.handleAddAlarm}>Add</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

const FormItem = (name, field, handleChangeAlarm) => {
    const options = [...Array(field.max - field.min + 1).keys()].map(i => (<MenuItem key={i + field.min} value={i + field.min}>{i + field.min}</MenuItem>));
    return (
        <Grid item key={name} xs={12} md={2}>
            <FormControl fullWidth>
                <InputLabel id={`${name}`}>
                    {name}
                </InputLabel>
                <Select value={field.value} label={field.name} onChange={(e) => handleChangeAlarm(name, e.target.value)}>
                    {options}
                </Select>
            </FormControl>
        </Grid>
    );
}

AlarmForm.propTypes = {
    handleAddAlarm: PropTypes.func,
    handleChangeAlarm: PropTypes.func,
    formFields: PropTypes.object,
}

export default AlarmForm