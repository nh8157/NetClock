require('dotenv').config();
const mongoose = require('mongoose');
const { Alarm } = require('../models/alarm');
const URL = process.env.DB_URL;

exports.connectDB = async () => {
    await mongoose.connect(URL);
}

// Use the self-defined schema to create a new alarm instance, store into the DB
// Return the results of storing
exports.addAlarm = async (alarm) => {
    const alarmObject = new Alarm(alarm);
    return await alarmObject.save();
}

exports.rmvAlarm = async (objectId) => {
    return await Alarm.deleteOne({ "_id": objectId });
}

exports.getAlarm = async (query) => {
    // can only process simple queries
    return await Alarm.find(query, {year: 1, month: 1, day: 1, hour: 1, minute: 1, status: 1, _id: 1});
}

exports.updateAlarm = async (objectId, query) => {
    // Use findById to locate the record
    // Then update the field in the record
    return await Alarm.updateOne({ "_id": objectId }, query);
}