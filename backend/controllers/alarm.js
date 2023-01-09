const db = require('../database/database');
const { Alarm, validateAND, validateOR } = require('../models/alarm');

const OBJECTID_ERR = "ObjectId invalid";
const DATETIME_ERR = "Alarm datetime invalid";
const NOALARM_ERR = "Alarm not found";
const ALARM_EXIST = "Alarm already exists";

exports.handleAddAlarm = (req, res) => {
    const { error } = validateAND(req.params);
    const isValidParams = error === undefined;
    const isValidAlarm = validateTime(req.params);
    if (isValidParams && isValidAlarm) {
        // create a new alarm object
        const alarm = new Alarm({
            year: req.params.year,
            month: req.params.month,
            day: req.params.day,
            hour: req.params.hour,
            minute: req.params.minute,
            status: false,
        });
        // If the record is saved successfully, then the returned result should be identical to alarm
        db.addAlarm(alarm).then(ret => {
            alarm === ret ? res.send({ status: true }) : res.send({ status: false, msg: ALARM_EXIST });
        });
    } else if (!isValidParams) {
        res.send({ status: false, msg: error });
    } else {
        res.send({ status: false, msg: DATETIME_ERR });
    }
}

exports.handleRmvAlarm = (req, res) => {
    // Validate if the object id passed in is valid
    if (validateObjectId(req.params.objectId)) {
        db.rmvAlarm(Alarm, req.params.objectId).then(ret => {
            ret.deletedCount !== 0 ?
                res.send({ status: true }) : res.send({ status: false, msg: NOALARM_ERR })
        });
    } else {
        res.send({ status: false, msg: OBJECTID_ERR });
    }
}

exports.handleGetAlarm = (req, res) => {
    // Add validation methods to check if query is legal
    const { error } = validateOR(req.query)
    if (error === undefined) {
        db.getAlarm(Alarm, req.query).then(ret => res.send(ret));
    } else {
        res.send({ status: false, msg: error });
    }
}

exports.handleUpdateAlarm = (req, res) => {
    const { error } = validateOR(req.query);
    const isValidObjectId = validateObjectId(req.params.objectId);
    const isValidParams = error === undefined;

    if (isValidObjectId && isValidParams) {
        // We may first retrieve the alarm from the DB
        // apply the patches to the alarm, then validate the alarm
        // If the alarm is valid, we update the record in the database
        db.updateAlarm(Alarm, req.params.objectId, req.query).then(ret => {
            (ret.matchedCount === 1 && ret.modifiedCount === 1) ?
                res.send({ status: true }) : res.send({ status: false, msg: NOALARM_ERR });
        });
    } else if (!isValidObjectId) {
        res.send({ status: false, msg: OBJECTID_ERR });
    } else {
        res.send({ status: false, msg: error });
    }
}

const validateObjectId = (objectId) => {
    return (typeof (objectId) === 'string' && new Blob([objectId]).size === 24)
}

const validateTime = (params) => {
    return true;
}