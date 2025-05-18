const Joi = require('joi');

export const validationSchema = Joi.object({
  // JWT
  JWT_SECRET_KEY: Joi.string().required(),
});
