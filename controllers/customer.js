const mongoose = require('mongoose');
const Customer = require('../models/customer');
const { validateCustomer } = require('../services/validate');

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers)
};
exports.postCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
}
exports.putCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  }, {
    new: true
  });
  if(!error) return res.status(404).send('The customer was not found!');
  res.send(customer);
}
exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.body.id);
  if(!customer) return res.status(404).send*('The given customer could not be fount!');
  res.send(customer);
}
exports.getCustomer = async (req, res) => {
  const customer = Customer.findById(req.body.id);
  if(!customer) return res.status(400).send('The customer not found!')
}
