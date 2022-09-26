const { Products } = require('../database/models');

const customerService = {
  async getAll() {
    const products = await Products.findAll({ raw: true });
    return products;
  },
};

module.exports = customerService;