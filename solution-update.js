const mongoose = require('mongoose');
const Course = require('./models/course');

// connect to database
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true });

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate( id, {
    $set: {
      author: 'Arthur',
      isPublished: true
    }
  }, { new: true });
  console.log(course)
}

updateCourse('5e90504bf92398170d4d024d');