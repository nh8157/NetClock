import React from 'react';
import PropTypes from 'prop-types';

const AlarmList = (props) => {
    const alarms = props.alarms.map((alarm) => (
        <li key={`${alarm.month}-${alarm.day}-${alarm.hour}-${alarm.minute}`}>
            {alarm.month} {alarm.day} {alarm.hour} {alarm.minute}
        </li>
    ))
    return (
        <ul className='alarm-list'>
            { alarms }
        </ul>
    )
};
AlarmList.propTypes = {
    alarms: PropTypes.array
}

export default AlarmList;