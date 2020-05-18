const express = require('express');
const router = express.Router();

const userRoutes = require('../controllers/users');

router.get('/', userRoutes.getUsers);
router.post('/', userRoutes.postUser);
router.put('/:id', userRoutes.putUsers);
router.delete('/:id', userRoutes.deleteUsers);
router.get('/:id', userRoutes.getUser);

module.exports = router;