const {
  validateBodySale, createSale, createSalesProducts } = require('../services/customerService');
const customerService = require('../services/customerService');
const loginService = require('../services/loginService');
const userService = require('../services/userService');

const customerController = {
  async getAll(req, res) {
    const token = await loginService.validateToken(req.headers);
    await loginService.readToken(token);
    const products = await customerService.getAll();
    res.json(products);
  },
  async createSale(req, res) {
    const token = await loginService.validateToken(req.headers);
    const payload = await loginService.readToken(token);
    const { user: { email } } = payload;
    const user = await userService.getByEmailOrThrows(email);
    const data = await validateBodySale(req.body);
    const { products, ...sale } = data;
    const { id } = await createSale({ userId: user.id, ...sale });
    await createSalesProducts(id, products);
    res.status(201).json({ saleId: id });
  },
};

module.exports = customerController;
