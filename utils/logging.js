/**
 *  @IMPORTANT
 * after spending a lot of time to figure out the bug, 
 * find out that winston-mongodb@3.0.0 is the best canditate for logging,
 * tried 4.0 and 5.0 they throw an error
 * 
 */
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
  // another aproche to log unhandled Rejections and uncaught Exceptionss
  winston.handleExceptions( 
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ 
    filename: './log/uncaughtExceptions.log',
    prettyPrint: false,
    json: false,
    colorize: true
  }));

  process.on('unhandledRejection', ex => { throw ex });

  winston.add(winston.transports.File, { 
    prettyPrint: false,
    filename: './log/logfile.log',
    colorize: true,
    json: false
  });

  winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: 'info' });
}