const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: false
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  await Course.updateOne({ _id: courseId }, {
    $set: {
      'author.name': 'Arthur McOnyan'
    }
  });
}

async function unsetAuthor(courseId) { 
  // unset nested document
  await Course.updateOne({_id: courseId}, {
    $unset: {
      'author': ''
    }
  });
}

// createCourse('Node Course', new Author({ name: 'Arthur' }));
// updateAuthor('5ebec1fa1aae7a1aba0c7cdd');
unsetAuthor('5ebec1fa1aae7a1aba0c7cdd');