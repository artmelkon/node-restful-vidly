const _ = require('lodash');

const { User, validate } = require('../models/user');

exports.getUsers = async (req, res) => {
  const users = await User.find().sort('name');

  res.send(users);
}

exports.postUser = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send('User already registered.')

<<<<<<< HEAD
  user = new User( _.pick[req.body, 'name', 'email', 'password']); // lodash version of an object
=======
  user = new User(req.body, _.pick['name', 'email', 'password']); // lodash version of an object
>>>>>>> vam1

  await user.save();

  res.send( _.pick(user, ['_id', 'name', 'email']) );
}