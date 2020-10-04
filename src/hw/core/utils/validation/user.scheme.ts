import * as Joi from '@hapi/joi';

module.exports = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^(?:\d+\w|\w+\d)[\w\d]+$/).required(),
    age: Joi.number().min(4).max(130).required()
});
