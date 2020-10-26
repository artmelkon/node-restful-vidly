const customersController = require('../controllers/customer');
const express = require('express');
const router = express.Router();

router.get('/', customersController.getCustomers);
router.post('/', customersController.postCustomer);
router.put('/:id', customersController.putCustomer);
router.delete('/:id', customersController.deleteCustomer);
router.get('/:id', customersController.getCustomer);

module.exports = router