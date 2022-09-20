const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  saleId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'sale_id',
    references: {
      model: 'Sales',
      key: 'id',
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'product_id',
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  quantity: { type: Sequelize.INTEGER },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const SaleProduct = sequelize.define('SaleProduct', attributes, {
    tableName: 'SalesProducts',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'Sale',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SaleProduct,
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SaleProduct,
    });
  };
  return SaleProduct;
};