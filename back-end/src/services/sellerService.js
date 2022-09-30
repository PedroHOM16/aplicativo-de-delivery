const Joi = require('joi');
const { Sales, SalesProducts, Products } = require('../database/models');
const { throwUnauthorizedError } = require('./utils');

const sellerService = {
  async validateRole(role) {
    if (role !== 'seller') throwUnauthorizedError();
  },

  async statusPrepare(sale) {
    const data = await Sales.findByPk(sale.id);
    data.setDataValue('status', 'Preparando');
    return data.toJSON();
  },

  async statusDispatch(sale) {
    const data = await Sales.findByPk(sale.id);
    data.setDataValue('status', 'Em Trânsito');
    return data.toJSON();
  },

  async validateParamsId(params) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const data = await schema.validateAsync(params);
    return data;
  },

  async getSalesBySellerId({ id }) {
    const response = await Sales.findAll({
      where: { sellerId: id } },
    {
      raw: true,
      attributes: { exclude: ['userId', 'sellerId'] },
    });
    const array = response.map((resp) => resp.toJSON());
    return array;
  },

  async getSale({ id }) {
    const response = await Sales.findByPk(id, { raw: true });
    return response;
  },

  async getProducts(id) {
    const response = await SalesProducts.findAll(
      { where: { saleId: id } }, { raw: true },
    );
    const array = response.map((resp) => resp.toJSON());
    const data = await Promise.all(array.map((item) => (
      Products.findByPk(item.productId,
        { raw: true,
          attributes: { exclude: ['urlImage'] },
        })
    )));
    const products = data.map((each) => {
      const result = array.find((item) => item.productId === each.id).quantity;
      const product = { ...each };
      product.quantity = result;
      product.subTotal = result * each.price;
      return product;
    });
    return products;
  },
};

module.exports = sellerService;