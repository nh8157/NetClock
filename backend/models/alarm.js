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
});

const JoiSchemaOR = Joi.object({
    year: Joi.number().optional(),
    month: Joi.number().optional(),
    day: Joi.number().optional(),
    hour: Joi.number().optional(),
    minute: Joi.number().optional(),
    status: Joi.boolean().optional(),
})

const Alarm = mongoose.model("alarm", AlarmSchema);

const validateAND = (alarm) => {
    return JoiSchemaAND.validate(alarm);
}

const validateOR = (alarm) => {
    return JoiSchemaOR.validate(alarm);
}

module.exports = { Alarm, validateAND, validateOR };