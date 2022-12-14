const Joi = require('joi');
const { products } = require('../../database/models');
const isUndefined = require('../utils/isUndefined');

const productsService = {
  updateBodyValidation: (data) => {
    const schema = Joi.object({
      name: Joi.string(),
      price: Joi.number().positive(),
      urlImage: Joi.string(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  createBodyValidation: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      urlImage: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.status = 400;
      throw error;
    }
    return value;
  },

  create: async ({ name, price, urlImage }) => {
    const productExists = await products.findOne({ where: { name } });

    if (productExists) {
      const e = new Error('Produto já existente');
      e.status = 409;
      throw e;
  }

    return products.create({ name, price, urlImage });
  },

  list: async () => products.findAll({}),

  findById: async (id) => {
    const item = await products.findByPk(id);

    isUndefined(item);

    return item;
  },

  delete: async (id) => {
    const item = await products.destroy({ where: { id } });

    isUndefined(item);

    return item;
  },

  update: async (id, data) => {
    const result = await products.update(data, { where: { id } });
    
    isUndefined(result);

    if (result[0] === 1) return products.findByPk(id);

    return { message: 'Sem alterações' };
  },
};

module.exports = productsService;