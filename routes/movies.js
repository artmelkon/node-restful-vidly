const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movies');
const validateGenre = require('../services/validate');

router.get('/', movieController.getMovies);
router.post('/', movieController.postMovie);