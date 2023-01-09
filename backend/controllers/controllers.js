const { addAlarm, rmvAlarm, getAlarm, updateAlarm } = require('../database/database');
const { Alarm } = require('../models/alarm');

const PARAMETERS_ERR = "Parameters invalid";
const OBJECTID_ERR = "ObjectId invalid";
const DATETIME_ERR = "Alarm datetime invalid";
const NOALARM_ERR = "Alarm not found";

function handleAddAlarm(req, res) {
    const isValidParams = validateParams(req.params, (len) => { return len === 5 });
    const isValidAlarm = validateAlarm(req.params);
    if (isValidParams && isValidAlarm) {
        // create a new alarm object
        const alarm = new Alarm ({
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            status: false,
        });
        // If the record is saved successfully, then the returned result should be identical to alarm
        addAlarm(alarm).then(ret => {
            res.send({ status: alarm === ret });
        });
    } else if (!isValidParams) {
        res.send({ status: false, msg: PARAMETERS_ERR });
    } else {
        res.send({ status: false, msg: DATETIME_ERR });
    }
}

function handleRmvAlarm(req, res) {
    // Validate if the object id passed in is valid
    if (validateObjectId(req.params.objectId)) {
        rmvAlarm(Alarm, req.params.objectId).then(ret => {
            ret.deletedCount !== 0 ? 
                res.send({ status: true }) : res.send({ status: false, msg: NOALARM_ERR })
        });
    } else {
        res.send({ status: false, msg: OBJECTID_ERR });
    }
}

function handleGetAlarm(req, res) {
    // Add validation methods to check if query is legal
    if (validateParams(req.query)) {
        getAlarm(Alarm, req.query).then(ret => res.send(ret));
    } else {
        res.send({ status: false, msg: PARAMETERS_ERR });
    }
}

function handleUpdateAlarm(req, res) {
    const isValidObjectId = validateObjectId(req.params.objectId);
    const isValidParams = validateParams(req.query, (len) => len <= 6);

    if (isValidObjectId && isValidParams) {
        // We may first retrieve the alarm from the DB
        // apply the patches to the alarm, then validate the alarm
        // If the alarm is valid, we update the record in the database
        updateAlarm(Alarm, req.params.objectId, req.query).then(ret => {
            (ret.matchedCount === 1 && ret.modifiedCount === 1) ?
                res.send({ status: true }) : res.send({ status: false, msg: NOALARM_ERR });
        });
    } else if (!isValidObjectId) {
        res.send({ status: false, msg: OBJECTID_ERR });
    } else {
        res.send({ status: false, msg: PARAMETERS_ERR });
    }
}

function validateObjectId(objectId) {
    return (typeof (objectId) === 'string' && new Blob([objectId]).size === 24)
}

function validateParams(params, callback) {
    if (Object.keys(params).length === 0)
        return true && (callback === undefined || callback(0));
    const fields = new Set(Object.keys(Alarm.schema.obj));
    let init = true
    return (Object.keys(params).reduce((acc, cur) => {
        return acc && fields.has(cur) && !isNaN(params[cur]) && acc !== '_id';
    }, init) && (callback === undefined || callback(Object.keys(params).length)));
}

function validateAlarm(params) {
    return true;
}

module.exports = { handleAddAlarm, handleRmvAlarm, handleGetAlarm, handleUpdateAlarm };