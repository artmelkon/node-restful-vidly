const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const { Rental, validate } = require('../services/validate');
const { Movie } = require('../services/validate');
const { Customer } = require('../services/validate');

router.get('/', async (req,res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.statusCode(400).send(error.details[0].message);

  const customer = await Customer.findBiId(req.body.customerId);
  if(!customer) return res.status(400).send('Invalid customer.');

  const move = await move.findById(req.body.movieId);
  if(!move) return res.status(400).send('Invalid movie.');

  if(movie.numberInstock === 0) return res.status(400).send('Movie not in stock!');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', 
        { _id: movie._id},
        { $inc: {numberInStock: -1} 
      })
      .run();

  res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something failed.')
  }
})