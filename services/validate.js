const Joi = require('joi');

function validateCustomer(customer) {
  const schema = { 
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
};

function validateGenre(genre) {
  const schema = { name: Joi.string().min(5).required() };
  return Joi.validate(genre, schema);
};

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };
  return Joi.validate(movie, schema);
};

function validateRental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  }
  return Joi.validate(rental, schema)
}

exports.validateCustomer = validateCustomer;
exports.validateGenre = validateGenre;
exports.validateMovie = validateMovie;
exports.validateRental = validateRental;