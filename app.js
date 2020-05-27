require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./utils/routes')(app);
require('./utils/db_connect')();

// // @process catching uncaught Exceptions
// process.on('uncaughtException', (ex) => {
//   // console.log('WE GOT AN UNCAUGHT EXCEPTION!');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });
//  loggoing doesn't work when running with node process.exit
// process.on('unhandledRejection', (ex) => {
//   // console.log('WE GOT AN UNHANDLED REJECTION!');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// another aproche to log unhandled Rejections and uncaught Exceptionss
winston.handleExceptions( new winston.transports.File({ filename: './log/uncaughtExceptions.log'}));
process.on('unhandledRejection', ex => { throw ex });

winston.add(winston.transports.File, { 
  prettyPrint: false,
  filename: './log/logfile.log',
  colorize: true,
  json: false
});
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly'});

// throw new Error('Someghing failed during startup');
// const p = Promise.reject(new Error('Something failed misarably!'));
// p.then(() => console.log('Done'));

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Node server connect to Posrt: ${PORT}`))
