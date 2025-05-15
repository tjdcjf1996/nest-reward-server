import Joi from 'joi';

export const validationSchema = Joi.object({
  // JWT
  JWT_SECRET_KEY: Joi.string().required(),
  // MongoDB
  MONGO_USER: Joi.string().required(),
  MONGO_PASS: Joi.string().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_DB: Joi.string().required(),
});
