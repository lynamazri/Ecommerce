const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(30).required(),
    birthDate: Joi.string().required(),
    adresses: Joi.any(),
    gender: Joi.string().required(),
    refreshToken: Joi.any(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(30).required(),
  });

  return schema.validate(data);
};

const changePassValidation = (data) => {
  const schema = Joi.object({
    curPassword: Joi.string().min(8).max(30).required(),
    newPassword: Joi.string().min(8).max(30).required(),
  });
  return schema.validate(data);
};

const applyStoreValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(6).max(380),
    phone: Joi.number().integer().positive().min(21000000).max(799999999),
    owners: Joi.any(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.changePassValidation = changePassValidation;
module.exports.applyStoreValidation = applyStoreValidation;
