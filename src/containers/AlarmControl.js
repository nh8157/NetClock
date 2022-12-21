import React from 'react';
import AlarmList from '../components/AlarmList/AlarmList';
import AlarmForm from '../components/AlarmForm/AlarmForm';

class AlarmControl extends React.Component {
    constructor(props) {
        super(props);
        this.addAlarm = this.addAlarm.bind(this);
        this.changeAlarm = this.changeAlarm.bind(this);

        this.state = {
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

    alarmExists(alarm) {
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
        const hasUndefined = Object.keys(alarm).find(element => alarm[element] === '') !== undefined;
        const alarmExists = this.alarmExists(alarm);
        if (!hasUndefined && !alarmExists) {
            const alarmList = [...this.state.alarmList];
            // check if every field of alarm is not null and alarm does not exist
            alarmList.push(alarm);
            this.setState({ alarmList });
        } else if (hasUndefined) {
            // show banner
        } else if (alarmExists) {
            // show banner
        }
        // flush all values in the box
        const formFields = {...this.state.formFields};
        Object.keys(formFields).map(key => formFields[key].value = '');
        this.setState({ formFields });
    }

    changeAlarm(field, value) {
        const formFields = { ...this.state.formFields };
        if (field in formFields) {
            formFields[field].value = value;
        }
        this.setState({ formFields });
    }

    render() {
        return (
            <div>
                <AlarmForm formFields={this.state.formFields} handleAddAlarm={this.addAlarm} handleChangeAlarm={this.changeAlarm} />
                <AlarmList alarms={this.state.alarmList} />
            </div>
        );
    }
}

export default AlarmControl;