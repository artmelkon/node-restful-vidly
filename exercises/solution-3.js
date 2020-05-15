const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => console.log('MongoDB connected successfully...'))
  .catch( err => console.error('Error - connecting MongoDB...', err ));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date },
  isPublished: Boolean,
  price: Number
});

const Course = new mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .or([ { price: {$gte: 15 } }, { name: /.*by.*/i } ])
}

async function run() {
  const courses = await getCourses();
  console.log(courses)
}

run();