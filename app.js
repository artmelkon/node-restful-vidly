const express = require('express');
const app = express();

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

var PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then( () => {
    console.log('MongoDB Connected Successfully.')
    app.listen(PORT, () => console.log(`Node server connect to Port: ${PORT}`))
  })
  .catch( err => console.error(err));
