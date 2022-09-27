const Joi = require('joi');
const { Products, Sales, SalesProducts } = require('../database/models');

const customerService = {
  async getAll() {
    const products = await Products.findAll({ raw: true });
    return products;
  },
  async validateBodySale(body) {
    const schema = Joi.object({
      sellerId: Joi.number().required(),
      totalPrice: Joi.number().precision(2).required(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      products: Joi.array().required().items(
        Joi.object({
          id: Joi.number().required(),
          quantity: Joi.number().required(),
        }),
      ),
    });
    const data = await schema.validateAsync(body);
    return data;
  },
  async createSale(data) {
    const response = await Sales.create(
      { status: 'Pendente', ...data },
      { raw: true },
    );
    return response.toJSON();
  },
  async createSalesProducts(saleId, data) {
    const obj = data.map(({ id, quantity }) => ({ saleId, productId: id, quantity }));
    await SalesProducts.bulkCreate(obj, { validate: true });
  },
};

module.exports = customerService;