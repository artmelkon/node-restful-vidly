const mongoose = require('mongoose');
const Course = require('../models/course');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => console.log('Mongodb connected successfully.'))
  .catch( err => console.error(err));

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: 'NETWORK',
    author: 'Arthur',
    tags: ['frontend'],
    isPublished: true,
    price: 15.7
  });
  try{
    const result = await course.save();
    console.log(result)
  }
  catch(ex) { 
    for(field in ex.errors)
      // validation itaration error messags
      console.error(ex.errors[field].message)};
}

createCourse();