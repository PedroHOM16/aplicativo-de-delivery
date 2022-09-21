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
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SaleProduct,
    });
    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SaleProduct,
    });
  };
  return SaleProduct;
};