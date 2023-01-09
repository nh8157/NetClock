const mongoose = require('mongoose');
const Joi = require('joi');

const AlarmSchema = new mongoose.Schema({
    year: { type: Number },
    month: { type: Number },
    day: { type: Number },
    hour: { type: Number },
    minute: { type: Number },
    status: { type: Boolean },
});

const JoiSchemaAND = Joi.object({
    year: Joi.number().required(),
    month: Joi.number().required(),
    day: Joi.number().required(),
    hour: Joi.number().required(),
    minute: Joi.number().required(),
    status: Joi.boolean().required(),
});

const Alarm = mongoose.model("alarm", AlarmSchema);

module.exports = { Alarm };