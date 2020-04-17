const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
// include files
const Genre = require('./controllers/genres');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    app.listen(PORT, () => console.log(`Node server connect to Posrt: ${PORT}`))
  })
  .catch( err => console.error(err));