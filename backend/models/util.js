function createAlarm(Alarm, year, month, day, hour, minute) {
    return new Alarm ({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        status: false,
    });
}

module.exports = ({ createAlarm })