const movieController = require('../controllers/movies');
const express = require('express');
const router = express.Router();

router.get('/', movieController.getMovies);
router.post('/', movieController.postMovie);