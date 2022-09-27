const { Users } = require('../database/models');

const userService = {
  async getSellers() {
    const data = Users.findAll({
      where: { role: 'seller' },
      attributes: { exclude: ['password', 'email', 'role'] },
      raw: true,      
    });
    return data;
  },
};

module.exports = userService;
