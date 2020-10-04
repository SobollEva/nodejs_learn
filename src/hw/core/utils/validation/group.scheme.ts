import * as Joi from '@hapi/joi';

module.exports = Joi.object().keys({
    name: Joi.string().required(),
    permission: Joi.array().items(Joi.string().regex(/READ|WRITE|DELETE|SHARE|UPLOAD_FILES/i)).required(),
});
