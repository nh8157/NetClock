const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
});

const JoiSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const User = mongoose.model("user", UserSchema);

// ### TESTABLE ###
// validates wheter the user has filled out all fields
const validate = (user) => {
    return JoiSchema.validate(user);
}

module.exports = { User, validate };