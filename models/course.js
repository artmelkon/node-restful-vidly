const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength:255,
    minlength: 5
  },
  author: String,
  category: {
    type: String,
    required: true,
    enum: ['web', 'server', 'network'],
    lowercase: true
  },
  tags: {
    type: Array,
    validate: {
      validator: v => {
        return new Promise( (resolve, reject) => {
          setTimeout(() => {
            resolve(v && v.length > 0);
          }, 4000)
        })
      },
      message: 'A course should have at least one tag!'
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 30,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

module.exports = mongoose.model('Course', courseSchema)