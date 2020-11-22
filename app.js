const winston = require('winston');
const express = require('express');
const app = express();

require('./utils/logging')();
require('./utils/routes')(app);
require('./utils/db')();
require('./utils/config')();
require('./utils/validation')();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => winston.info(`Listening on Port ${PORT}...`));

module.exports = server;