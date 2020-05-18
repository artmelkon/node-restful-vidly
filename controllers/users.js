const User = require('../models/user');

exports.getUsers = async (req, res) {
  const users = await Uaer.find().sort('name');

  res.send(user);
}


