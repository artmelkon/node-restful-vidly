const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

  user = new User( _.pick(req.body, ['name', 'email', 'password'])); // lodash version of an object
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

<<<<<<< HEAD
  res.send( _.pick(user, ['_id', 'name', 'email']) );
}
=======
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send( _.pick(user, ['_id', 'name', 'email']) );
}

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
}
>>>>>>> 588b48f84595d3387146ba0597bf5f6f1a482505
