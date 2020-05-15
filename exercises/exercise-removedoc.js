const mongoose = require('mongoose');
const Course = require('../models/course');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true });

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result)
}

removeCourse('5e90504bf92398170d4d024d')