const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genre');

router.get('/', genreController.getGenres);
router.post('/', genreController.postGenre);
router.put('/:id', genreController.putGenre);
router.delete('/:id', genreController.deleteGenre);
router.get('/:id', genreController.getGenre)

module.exports = router;