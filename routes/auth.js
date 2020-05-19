const express = require('express');
const router = express.Router();

const authControlle = require('../controllers/auth');

router.post('/', authControlle.postLogin);

module.exports = router;