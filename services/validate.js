function validateCustomer(customer) {
  const schema = { 
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGod: Joi.boolian()
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
    genreID: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };
  return Joi.validate(movie, schema);
};


exports.validateCustomer = validateCustomer;
exports.validateCustomer = validateGenre;
exports.validateMovie = validateMovie;