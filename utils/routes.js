
const bodyParser = require('body-parser');

// include files
const authRoutes      = require('../routes/auth');
const customerRoutes  = require('../routes/customers');
const genreRoutes     = require('../routes/genres');
const movieRoutes     = require('../routes/movies');
const rentalRoutes    = require('../routes/rentals');
const userRoutes      = require('../routes/users');
const error           = require('../services/error');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/login', authRoutes);
  app.use('/api/genres', genreRoutes);
  app.use('/api/customers', customerRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/rentals', rentalRoutes);
  app.use('/api/users', userRoutes);
  app.use(error);
}