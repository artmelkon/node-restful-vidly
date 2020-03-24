const mogoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('MongoDB Connected'))
  .catch( err => console.loc(new Error('Error', err.message)))