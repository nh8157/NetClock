require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.DB_URL;

exports.connectDB = async () => {
    await mongoose.connect(URL);
}

// Use the self-defined schema to create a new alarm instance, store into the DB
// Return the results of storing
exports.addAlarm = async (alarm) => {
    return await alarm.save();
}

exports.rmvAlarm = async (model, objectId) => {
    return await model.deleteOne({ "_id": objectId });
}

exports.getAlarm = async (model, query) => {
    // can only process simple queries
    return await model.find(query, {year: 1, month: 1, day: 1, hour: 1, minute: 1, status: 1, _id: 1});
}

exports.updateAlarm = async (model, objectId, queries) => {
    // Use findById to locate the record
    // Then update the field in the record
    return await model.updateOne({ "_id": objectId }, queries);
}