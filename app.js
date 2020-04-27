const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
// include files
const genreRoutes = require('./routes/genre');
const customerRoutes = require('./routes/customer.');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);


var PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then( () => {
    console.log('MongoDB Connected Successfully.')
    app.listen(PORT, () => console.log(`Node server connect to Posrt: ${PORT}`))
  })
  .catch( err => console.error(err));