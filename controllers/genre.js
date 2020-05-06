const Joi = require('joi');
const Genre = require('../models/genre');
const { validateGenre } = require('../services/validate');


exports.getGenres = async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
};
exports.postGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name
  })
  gnere = await genre.save();
  res.send(genre);
};
exports.putGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!genre) return res.status(404).send('The genre of given Id could not be found!');

  res.send(genre)
};
exports.deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndDelete( req.params.id );

  if(!genre) return res.status(404).send('The genre of given Id could not be found!')

  res.send(genre)
};
exports.getGenre = async (req, res) => {
  const genre = await Genre.findBiId(req.params.id);

  if(!genre) return res.status(404).send('The genre of given Id could not be found!')
  res.send(genre)
};


