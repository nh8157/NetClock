import React from 'react';
import AlarmList from '../components/AlarmList/AlarmList';
import AlarmForm from '../components/AlarmForm/AlarmForm';
import { Alert, AlertTitle, Stack, Box } from '@mui/material';

class AlarmControl extends React.Component {
    constructor(props) {
        super(props);
        this.addAlarm = this.addAlarm.bind(this);
        this.changeAlarm = this.changeAlarm.bind(this);

        this.state = {
            success: false,
            errorMsg: '',
            formFields: {
                'Year': { min: 2022, max: 2023, value: '' },
                'Month': { min: 1, max: 12, value: '' },
                'Day': { min: 1, max: 31, value: '' },
                'Hour': { min: 1, max: 24, value: '' },
                'Minute': { min: 0, max: 59, value: '' },
            },
            alarmList: [{ year: 2022, month: 12, day: 20, hour: 12, minute: 20 }],  // contains list of alarms defined
        }
    }

    generateAlarm() {
        const formFields = this.state.formFields;
        return {
            year: formFields['Year'].value,
            month: formFields['Month'].value,
            day: formFields['Day'].value,
            hour: formFields['Hour'].value,
            minute: formFields['Minute'].value,
        }
    }

    checkAlarmExists(alarm) {
        return this.state.alarmList.find(element => {
            let flag = true;
            Object.keys(element).forEach(key => {
                if (element[key] !== alarm[key]) {
                    flag = false;
                }
            });
            return flag;
        }) !== undefined;
    }

    addAlarm() {
        const alarm = this.generateAlarm();
        let success = true;
        const hasUndefined = Object.keys(alarm).find(element => alarm[element] === '') !== undefined;
        const alarmExists = this.checkAlarmExists(alarm);
        if (!hasUndefined && !alarmExists) {
            const alarmList = [...this.state.alarmList];
            // check if every field of alarm is not null and alarm does not exist
            alarmList.push(alarm);
            this.setState({ alarmList });
        } else if (hasUndefined) {
            success = false;
            const errorMsg = 'Please fill out all fields.';
            this.setState({ errorMsg });
        } else {
            success = false;
            const errorMsg = 'Alarm already exists.';
            this.setState({ errorMsg });
        }
        // flush all values in the box
        const formFields = { ...this.state.formFields };
        Object.keys(formFields).map(key => formFields[key].value = '');
        this.setState({ formFields, success });
    }

    changeAlarm(field, value) {
        const formFields = { ...this.state.formFields };
        if (field in formFields) {
            formFields[field].value = value;
        }
        this.setState({ formFields });
    }

    resetSuccessState() {
        const success = false;
        const errorMsg = '';
        this.setState({ success, errorMsg });
    }

    render() {
        return (
            <Stack spacing={2}>
                <Box height={55}>
                    {
                        !this.state.success && this.state.errorMsg !== '' &&
                        <Alert severity='error' onClose={() => this.resetSuccessState()}>
                            <AlertTitle>{this.state.errorMsg}</AlertTitle>
                        </Alert>
                    }
                    {
                        this.state.success &&
                        <Alert severity='success' onClose={() => this.resetSuccessState()}>
                            <AlertTitle>Successful.</AlertTitle>
                        </Alert>
                    }
                </Box>
                <AlarmForm formFields={this.state.formFields} handleAddAlarm={this.addAlarm} handleChangeAlarm={this.changeAlarm} />
                <AlarmList alarms={this.state.alarmList} />
            </Stack>
        );
    }
}

export default AlarmControl;