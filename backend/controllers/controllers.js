const { addAlarm, rmvAlarm, updateAlarm } = require('../database/database');
const { createAlarm } = require('../models/util');

function handleAddAlarm(model, req, res) {
    // Error handling needed
    const alarm = createAlarm(model, req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minute);
    // If the record is saved successfully, then the returned result should be identical to alarm
    addAlarm(alarm).then(ret => {
        res.send({ status: alarm === ret });
    });
}

function handleRmvAlarm(model, req, res) {
    // Error handling needed
    // locate the alarm with the same object id as passed in
    rmvAlarm(model, req.params.objectId).then(ret => {
        res.send({ status: ret.deletedCount !== 0 });
    });
}

function handleGetAlarm(model, req, res) {

}

function handleUpdateAlarm(model, req, res) {
    // Error handling needed
    // First validate the length of objectId
    // filter the queries and pass them into the database
    updateAlarm(model, req.params.objectId, req.query).then(ret => {
        res.send({ status: ret.matchedCount === 1 && ret.modifiedCount === 1 });
    });
}

module.exports = { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm };