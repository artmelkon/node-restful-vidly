const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 80
  },
  phone: {
    type: Number,
    require: true,
    minlength: 5,
    maxlength: 50
  }
})

module.exports = mongoose.model('Customer', customerSchema);