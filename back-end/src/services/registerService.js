const Joi = require('joi');
const md5 = require('md5');
const { throwConflictError } = require('./utils');
const { Users } = require('../database/models');

const registerService = {
    async validateBodyRegister(body) {
      const schema = Joi.object({
        name: Joi.string().required().min(12),
        email: Joi.string().required().email().max(255),
        password: Joi.string().required().min(6),
      });
      const data = await schema.validateAsync(body);
      return data;
    },
    async getByEmailOrThrows(data) {
        const { email } = data;
        const user = await Users.findOne({
          where: { email },
          raw: true,
        });
        if (user) throwConflictError('Email já cadastrado');
    },
    async createUser({ name, password, email }) {
      console.log(name);
        const payload = {
         name,
         password: md5(password),
         email,
         role: 'customer',
        };
        const user = await Users.create(payload, { raw: true });
        return user.dataValues;
    },
};

module.exports = registerService;
