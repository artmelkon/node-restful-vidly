const express = require('express');
const router = express.Router();
const genreConroller = require('../controllers/genres');

router.get('/', genreController.getGenres);
router.post('/', genreConroller.postGenre);
router.put('/:id', genreConroller.putGenre);
router.delete('/:id', genreConroller.deleteGenre);
router.get('/:id', genreConroller.getGenre)
