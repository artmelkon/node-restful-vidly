const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb Connected Successfully');
  })
  .catch( err => console.error('Error - Cannot connect ot MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
})

const Course = mongoose.model('Course',courseSchema);

async function getCourses() {

  return await Course
  // .find({ name: /^Node.*/i, isPublished: true })
  .find({ isPublished: true, tags: 'backend' })
  .sort({ name: 1 })
  .select({ name: 1, author: 1})

}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();

