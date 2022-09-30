const { Router } = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRoute = Router();

sellerRoute.get('/orders', sellerController.getOrdersBySellerId);
sellerRoute.get('/orders/:id', sellerController.getOrderById);
// sellerRoute.post('', sellerController.sendStatus);

module.exports = sellerRoute;