const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 124
    },
    last: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 124
    },
    required: [true, "can't be blank"]
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
}));

function validateUser(user) {
  const shema = {
    name: {
      first: Joi.string().min(5).max(124).required(),
      last: Joi.string().min(5).max(124).required()
    },
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;