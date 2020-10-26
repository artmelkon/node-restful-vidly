const winston = require('winston');
const mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;

module.exports = function(app) {
  mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then( () => {
    app.listen(PORT, () => winston.info(`Node server connect to Posrt: ${PORT}`))
    winston.info('MongoDB Connected Successfully.')
  })
}