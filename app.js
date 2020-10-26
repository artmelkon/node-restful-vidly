const config = require('config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

// included route files
const genreRoutes = require('./routes/genre');
const customersRoutes = require('./routes/customers')
const moviesRoutes = require('./routes/movies');
const rentalsRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/genres', genreRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

var PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then( () => {
    console.log('MongoDB Connected Successfully.')
    app.listen(PORT, () => console.log(`Node server connect to Port: ${PORT}`))
  })
  .catch( err => console.error(err));
