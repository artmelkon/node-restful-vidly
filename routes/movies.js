const express = require('express');
const router = express.Router();

const auth = require('../services/auth');
const movieController = require('../controllers/movies');

router.get('/', auth, movieController.getMovies);
router.post('/', auth, movieController.postMovie);
router.put('/', movieController.putMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;