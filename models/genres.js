const Joi = require('joi');
const mongoose = require('mongoose');
const validateGenre = require('../services/validate');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;