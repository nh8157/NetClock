const db = require('../database/database');
const { Alarm, validateAND, validateOR } = require('../models/alarm');

const OBJECTID_ERR = "ObjectId invalid";
const DATETIME_ERR = "Alarm datetime invalid";
const NOALARM_ERR = "Alarm not found";
const ALARM_EXIST = "Alarm already exists";

exports.handleAddAlarm = (req, res) => {
    const { error } = validateAND(req.body);
    const isValidParams = error === undefined;
    const isValidAlarm = validateTime(req.body);
    if (isValidParams && isValidAlarm) {
        // create a new alarm object
        const params = req.body;
        const alarm = new Alarm({
            year: params.year,
            month: params.month,
            day: params.day,
            hour: params.hour,
            minute: params.minute,
            status: false,
        });
        // If the record is saved successfully, then the returned result should be identical to alarm
        db.addAlarm(alarm).then(ret => {
            alarm === ret ?
                res.send({ status: true, id: ret._id }) : res.send({ status: false, msg: ALARM_EXIST });
        });
    } else if (!isValidParams) {
        res.send({ status: false, msg: error });
    } else {
        res.send({ status: false, msg: DATETIME_ERR });
    }
}

exports.handleRmvAlarm = (req, res) => {
    // Validate if the object id passed in is valid
    const objectId = req.body.objectId;
    if (validateObjectId(objectId)) {
        db.rmvAlarm(Alarm, objectId).then(ret => {
            ret.deletedCount !== 0 ?
                res.send({ status: true, id: objectId }) : res.send({ status: false, msg: NOALARM_ERR })
        });
    } else {
        res.send({ status: false, msg: OBJECTID_ERR });
    }
}

exports.handleGetAlarm = (req, res) => {
    // Add validation methods to check if query is legal
    const { error } = validateOR(req.body)
    if (error === undefined) {
        db.getAlarm(Alarm, req.body).then(ret => res.send(ret));
    } else {
        res.send({ status: false, msg: error });
    }
}

exports.handleUpdateAlarm = (req, res) => {
    let objectId = undefined;
    try {
        objectId = req.body.objectId;
        delete req.body.objectId;
    } catch {
        return res.send({ status: false, msg: "No objectId was provided" });
    }

    const { error } = validateOR(req.body);
    const isValidObjectId = validateObjectId(objectId);
    const isValidParams = error === undefined;

    if (isValidObjectId && isValidParams) {
        // We may first retrieve the alarm from the DB
        // apply the patches to the alarm, then validate the alarm
        // If the alarm is valid, we update the record in the database
        db.updateAlarm(Alarm, objectId, req.body).then(ret => {
            if (ret.matchedCount === 0) {
                res.send({ status: false, msg: NOALARM_ERR });
            } else if (ret.matchedCount === 1 && ret.modifiedCount === 0) {
                res.send({ status: false, msg: "No alarm was modified" });
            } else if (ret.matchedCount === 1 && ret.modifiedCount === 1) {
                res.send({ status: true, id: objectId });
            }
        });
    } else if (!isValidObjectId) {
        res.send({ status: false, msg: OBJECTID_ERR });
    } else {
        res.send({ status: false, msg: error });
    }
}

// ### TESTABLE ###
const validateObjectId = (objectId) => {
    return (typeof (objectId) === 'string' && new Blob([objectId]).size === 24)
}

// ### TESTABLE ###
const validateTime = (params) => {
    return true;
}