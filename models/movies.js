const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: { 
    type: String,
    require: true,
    trim: true,
    minlength: 5,
    maxlenght: 255
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max:255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}));

exports.movieSchema = movieSchema;
