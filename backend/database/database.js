require('dotenv').config();
const mongoose = require('mongoose');
const { AlarmSchema } = require('../models/schema');

const URL = process.env.DB_URL;

async function connectDB() {
    await mongoose.connect(URL);
}

function createModel() {
    const alarmSchema = new mongoose.Schema(AlarmSchema);
    return mongoose.model('Alarm', alarmSchema);
}

// Use the self-defined schema to create a new alarm instance, store into the DB
// Return the results of storing
async function addAlarm(alarm) {
    return await alarm.save();
}

async function rmvAlarm(model, objectId) {
    return await model.deleteOne({ "_id": objectId });
}

async function getAlarm(model, query) {
    // can only process simple queries
    return await model.find(query, {year: 1, month: 1, day: 1, hour: 1, minute: 1, status: 1, _id: 1});
}

async function updateAlarm(model, objectId, queries) {
    // Use findById to locate the record
    // Then update the field in the record
    return await model.updateOne({ "_id": objectId }, queries);
}


module.exports = { connectDB, createModel, addAlarm, rmvAlarm, getAlarm, updateAlarm };