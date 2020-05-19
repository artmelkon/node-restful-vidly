const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { User } = require('../models/user');

exports.postLogin = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send('Invalid username or password');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid username or password');

  const token = user.generateAuthToken();
  res.send(token)
}

async function validate(user) {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).max(255).required()
  }
  return Joi.validate(user, schema)
}