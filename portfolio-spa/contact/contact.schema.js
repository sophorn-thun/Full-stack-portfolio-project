import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(30)
    .required(),
  
  email: Joi.string().email(),

  message: Joi.string()
    .min(10)
    .max(1000)
}).unknown(false)