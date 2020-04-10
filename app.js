const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch( err => console.error('Error', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255,
    // mmatch: /regex-patter/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'server', 'network']
  },
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: '-',
    author: 'Arthur',
    tags: ['angular', 'frontend' ],
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


// createCourse();
createCourse();
// getCourses();