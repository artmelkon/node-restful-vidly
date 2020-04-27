const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');
const mongoose = require('mongoose');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
}

exports.postMovie = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre');

  let movie = new Movie({
    
  })
}