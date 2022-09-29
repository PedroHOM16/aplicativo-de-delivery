const { Router } = require('express');
const customerController = require('../controllers/customerController');

const customerRoute = Router();

customerRoute.post('/checkout', customerController.createSale);
customerRoute.get('/products', customerController.getAll);
customerRoute.get('/orders/sale/:id', customerController.getOrderById);

module.exports = customerRoute;