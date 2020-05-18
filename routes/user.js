const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/users');

router.get('/', userControllers.getUsers);
router.post('/', userControllers.postUser);
// router.put('/:id', userControllers.putUsers);
// router.delete('/:id', userControllers.deleteUsers);
// router.get('/:id', userControllers.getUser);

module.exports = router;