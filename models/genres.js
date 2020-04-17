const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
    minlength: 5,
    maxlength: 50
  }
});

module.exports = mongoose.model('Genre', genreSchema);
