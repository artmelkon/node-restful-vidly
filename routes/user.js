const express = require('express');
const router = express.Router();

const auth = require('../services/auth');
const userControllers = require('../controllers/users');

router.get('/', userControllers.getUsers);
router.post('/', userControllers.postUser);
// router.put('/:id', userControllers.putUsers);
// router.delete('/:id', userControllers.deleteUsers);
router.get('/me', auth, userControllers.getUser);

module.exports = router;