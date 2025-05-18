const Joi = require('joi');

export const validationSchema = Joi.object({
  // JWT
  JWT_SECRET_KEY: Joi.string().required(),

  // msa 통신용
  MSA_SERVER_KEY: Joi.string().required(),

  // msa 서버 주소
  AUTH_SERVER: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
  EVENT_SERVER: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),

  // PORT
  PORT: Joi.number().default(3000),
});
