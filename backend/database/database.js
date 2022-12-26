const mongoose = require('mongoose');
const { AlarmSchema } = require('../models/schema')

const URL = "mongodb://127.0.0.1:27017/alarms";

async function connectDB() {
    await mongoose.connect(URL);
}

function createModel() {
    const alarmSchema = new mongoose.Schema(AlarmSchema);
    return mongoose.model('Alarm', alarmSchema);
}

function addAlarm(model) {

}

function rmvAlarm(model) {

}

function getAlarm(model) {

}

function updateAlarm(model) {

}


module.exports = { connectDB, createModel };