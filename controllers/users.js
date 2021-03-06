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

  // lodash version of an object
  user = new User( _.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send( _.pick(user, ['_id', 'name', 'email']) );
}
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user) return res.status(404).send("User with given ID can't be found!");
  return res.send(user);
};
exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password'); // to exclujde password: -password
  res.send(user);
};