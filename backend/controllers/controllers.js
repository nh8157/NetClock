const { addAlarm, rmvAlarm, updateAlarm } = require('../database/database');
const { createAlarm } = require('../models/util');

function handleAddAlarm(model, req, res) {
    // Error handling needed
    if (validateParams(req.params, (len) => {return len === 5})) {
        const alarm = createAlarm(model, req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minute);
        // If the record is saved successfully, then the returned result should be identical to alarm
        addAlarm(alarm).then(ret => {
            res.send({ status: alarm === ret });
        });
    } else {
        res.send({ status: false });
    }
}

function handleRmvAlarm(model, req, res) {
    // Validate if the object id passed in is valid
    if (validateObjectId(req.params.objectId)) {
        rmvAlarm(model, req.params.objectId).then(ret => {
            res.send({ status: ret.deletedCount !== 0 });
        });
    } else {
        res.send({ status: false, msg: "ObjectId invalid" });
    }
}

function handleGetAlarm(model, req, res) {

}

function handleUpdateAlarm(model, req, res) {
    const isValidObjectId = validateObjectId(req.params.objectId);
    const isValidParams = validateParams(req.query, (len) => len <= 5)
    if (isValidObjectId && isValidParams) {
        updateAlarm(model, req.params.objectId, req.query).then(ret => {
            res.send({ status: ret.matchedCount === 1 && ret.modifiedCount === 1 });
        });
    } else if (!isValidObjectId) {
        res.send({ status: false, msg: "ObjectId invalid" });
    } else {
        res.send({ status: false, msg: "Parameters invalid" })
    }
}

function validateObjectId(objectId) {
    return (typeof (objectId) === 'string' && new Blob([objectId]).size === 24)
}

function validateParams(params, callback) {
    return (Object.keys(params).reduce((acc, cur) => {
        const fields = new Set(['year', 'month', 'day', 'hour', 'minute']);
        if (typeof (acc) !== 'boolean') {
            acc = fields.has(acc);
        }
        return acc && fields.has(cur);
    }) && (callback(Object.keys(params).length) || true));
}

module.exports = { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm };