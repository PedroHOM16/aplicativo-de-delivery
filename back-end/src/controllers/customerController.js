const customerService = require('../services/customerService');
const loginService = require('../services/loginService');

const customerController = {
  async getAll(req, res) {
    const token = await loginService.validateToken(req.headers);
    await loginService.readToken(token);
    const products = await customerService.getAll();
    res.json(products);
  },
};

module.exports = customerController;