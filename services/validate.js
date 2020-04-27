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


exports.validateCustomer = validateCustomer;
exports.validateCustomer = validateGenre;