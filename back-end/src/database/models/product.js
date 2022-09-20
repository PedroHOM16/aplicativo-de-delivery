const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.DECIMAL(4, 2) },
  urlImage: {
    type: Sequelize.STRING,
    field: 'url_Image',
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Product = sequelize.define('Product', attributes, {
    tableName: 'Products',
    timestamps: false,
  });
  return Product;
};