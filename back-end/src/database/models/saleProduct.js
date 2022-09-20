const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  saleId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'sale_id',
    references: {
      model: 'Sale',
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
  const SaleProduct = sequelize.define('SalesProducts', attributes, {
    tableName: 'SalesProducts',
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SaleProduct,
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SaleProduct,
    });
  };
  return SaleProduct;
};