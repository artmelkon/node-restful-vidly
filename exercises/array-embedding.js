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
  authors: [ authorSchema ]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save()
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('Node Course', [
//   new Author({ name: 'Arthur Melcon' }),
//   new Author({ name: 'john Smith' }),
//   new Author({ name: 'Art McOnyan' })
// ]);

// addAuthor('5ebf09beecb6bd24ee3d8420', new Author({ name: 'Annie' }));

removeAuthor( '5ebf09beecb6bd24ee3d8420', '5ebf09beecb6bd24ee3d841f' );