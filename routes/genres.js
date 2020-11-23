const validateObjectId = require('../services/validateObjectId');
const express = require('express');
const router = express.Router();

const auth = require('../services/auth');
const admin = require('../services/admin');
const genreController = require('../controllers/genres');

router.get('/', genreController.getGenres);
router.post('/', auth, genreController.postGenre);
router.put('/:id', genreController.putGenre);
router.delete('/:id', [auth, admin], genreController.deleteGenre);
router.get('/:id', validateObjectId, genreController.getGenre)

module.exports = router;