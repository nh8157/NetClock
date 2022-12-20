import React from 'react';
import AlarmList from '../components/AlarmList/AlarmList';
import AlarmForm from '../components/AlarmForm/AlarmForm';

class AlarmControl extends React.Component {
    constructor(props) {
        super(props);
        this.addAlarm = this.addAlarm.bind(this);

        this.state = {
            alarmList: [{ year: 2022, month: 12, day: 20, hour: 12, minute: 20 }],  // contains list of alarms defined
        }
    }

    generateAlarm(year, month, day, hour, minute) {
        return { year: year, month: month, day: day, hour: hour, minute: minute }
    }

    addAlarm(year, month, day, hour, minute) {
        const alarm = { year: year, month: month, day: day, hour: hour, minute: minute };
        const alarmList = [ ...this.state.alarmList ];
        // console.log(alarmList);
        alarmList.push(alarm);
        this.setState({ alarmList })
    }

    setValue(field, value) {

    }

    render() {
        return (
            <div>
                <AlarmForm fields={this.formFields} handleAddAlarm={this.addAlarm} />
                <AlarmList alarms={this.state.alarmList} />
            </div>
        );
    }
}

export default AlarmControl;