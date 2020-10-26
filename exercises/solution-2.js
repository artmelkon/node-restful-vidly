const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => console.log('MongoDB connected successfully...'))
  .catch( err => console.error('Unable to connect MongoDB...', err))
  
  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date },
    isPublished: Boolean,
    price: Number
  })

  const Course = mongoose.model('Course', courseSchema);

  async function getCourse() {

    return await Course
      // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] }})
      .find({ isPublished: true })
      .or([ { tags: 'front-end'}, {tags: 'backend'} ])
      .sort('-price')
      .select( 'name author price' )
  }

  async function run() {
    const courses = await getCourse();
    console.log(courses)
  }

  run();