
const bodyParser = require('body-parser');

// include files
const authRoutes = require('../routes/auth');
const genreRoutes = require('../routes/genre');
const customerRoutes = require('../routes/customer.');
const movieRoutes = require('../routes/movie');
const rentalRoutes = require('../routes/rental');
const userRoutes = require('../routes/user');
const error = require('../services/error');

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