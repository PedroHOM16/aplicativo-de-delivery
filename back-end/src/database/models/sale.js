const Sequelize = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
  },
  sellerId: {
    type: Sequelize.INTEGER,
    field: 'seller_id',
  },
  totalPrice: {
    type: Sequelize.DECIMAL(9, 2),
    field: 'total_price',
  },
  deliveryAddress: {
    type: Sequelize.STRING,
    field: 'delivery_address',
  },
  deliveryNumber: {
    type: Sequelize.STRING,
    field: 'delivery_number',
  },
  saleDate: {
    type: Sequelize.DATE,
    field: 'sale_date',
  },
  status: {
    type: Sequelize.STRING,
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Sale = sequelize.define('Sale', attributes, {
    tableName: 'Sales',
    timestamps: false,
  });
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'user' });
  };
  return Sale;
};