const Joi = require('joi');
const mongoose = require('mongoose');
const Genre = require('../models/genres');
const express = require('express');
const router = express.Router();

router.use(express.json());

exports.getGenres = async (req, res) => {
  const genres = await Gengre.find().sort('name');
  res.send(genres);
};
exports.postGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name
  })
  gnere = await genre.sav();
  res.send(genre);
};
exports.putGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  Ganre.fineByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
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


function validateGenre(genre) {
  const schema = { name: Joi.string().min(3).required() }
  return Joi.validate(genre, schema);
}
