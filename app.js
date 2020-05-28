const express = require('express');
const app = express();

require('./utils/logging')();
require('./utils/routes')(app);
require('./utils/db_connect')(app);
require('./utils/config')();
require('./utils/validation')();