const express = require('express');
const router = express.Router();

const rentalController = require('../controllers/rentals');

router.get('/', rentalController.getRentals);
router.post('/', rentalController.postRental);

module.exports = router;