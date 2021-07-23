const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getMap = {
  params: Joi.object().keys({
    _id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getMap,
};