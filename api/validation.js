const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    birthDate: Joi.string().required(),

    adresses: Joi.any(),
    gender: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
