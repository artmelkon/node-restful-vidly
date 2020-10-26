const winston = require('winston');

module.exports = function(err, req, res, nex ) {
  winston.error(err.message, err)
  // winston.log('error', message.err) // loggin message level passed as an argument
  // error
  // warning
  // info
  // verbos
  // debug
  // silly

  res.status(500).send("Something went wrong.")
}