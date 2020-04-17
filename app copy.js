const mongoose = require('mongoose');
const Course = require('./models/course')


async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: 'web',
    author: 'Arthur',
    tags: null,
    isPublished: true,
    price: 15
  });
  
  try {
    const result = await course.save();
    console.log(result);
  }
  catch (ex) {
    console.log(ex.message)
  }
}

/********************************\
 *  Mongodb standard operators  *
 * 
 *  eq (equal)
 * ne (not equal)
 * gt (grater than)
 * gte (grater than or equal to)
 * lt (less than)
 * lte (less than or equal to)
 * in
 * nin (not in)
 * 
 * or method
 * and method
 \*******************************/

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;


  const courses = await Course
    .find({ author: 'Arthur', isPublished: true})
    // .find({price: {$gt: 10, $lte: 20}})
    // .find(price: {$in: [10,15,20]})
    // .find({author: {$in: ['Arthur']}, isPublished: true})
    //######################################
    // .find()
    // .or([{author: 'Arthur'}, {isPublished: true}])
    // .find({author: /^Arthur/})
    // .find({author: /McOnyan$/})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({name: -1}) // enter 1 for ascending order
    // .select({name: 1, tags: 1})
    .countDocuments() // count method deprecated
  console.log(courses);
}

async function updateCourse(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Simon',
      rating: '5'
    }
  });
  console.log(result)
}


// createCourse();
// createCourse();
// getCourses();

updateCourse('5e90504bf92398170d4d024d');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch( err => console.error('Error', err));

