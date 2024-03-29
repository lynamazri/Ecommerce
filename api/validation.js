const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(30).required(),
    //.pattern(new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$"))
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
    mainCat: Joi.any(),
    name: Joi.string().min(4).max(30).required(),
    description: Joi.string().min(6).max(380),
    phone: Joi.number().integer().positive().min(21000000).max(799999999),
    owners: Joi.any(),
    workingHours: Joi.string(),
    category: Joi.any(),
  });
  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).max(30),
    lastName: Joi.string().min(4).max(30),
    newUsername: Joi.string().min(6).max(30),
    bankAccount: Joi.number(),
  });
  return schema.validate(data);
};

const addressValidation = (data) => {
  const schema = Joi.object({
    street: Joi.string().min(8).max(100).required(),
    city: Joi.string().min(4).max(40).required(),
    state: Joi.string().min(4).max(40).required(),
    zip: Joi.number().integer().positive().min(1000).max(48999),
  });
  return schema.validate(data);
};

const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(35).required(),
    description: Joi.string().min(20).max(500).required(),
  });
  return schema.validate(data);
};

const subCatValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(35).required(),
    parentCat: Joi.string().min(4).max(35).required(),
  });
  return schema.validate(data);
};

const categoryValidationOnUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(35),
    description: Joi.string().min(20).max(500),
  });
  return schema.validate(data);
};

const subCatValidationOnUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(35),
    parentCat: Joi.string().min(4).max(35),
  });
  return schema.validate(data);
};

const reviewValidation = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(4).max(200),
    stars: Joi.number().min(1).max(5),
  });
  return schema.validate(data);
};

const questionValidation = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(10).max(500),
  });
  return schema.validate(data);
};

const storeUpdateValidation = (data) => {
  const schema = Joi.object({
    description: Joi.string().min(20).max(500),
    workingHours: Joi.string(),
    phone: Joi.number().integer().positive().min(21000000).max(799999999),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.changePassValidation = changePassValidation;
module.exports.applyStoreValidation = applyStoreValidation;
module.exports.updateProfileValidation = updateProfileValidation;
module.exports.addressValidation = addressValidation;
module.exports.categoryValidation = categoryValidation;
module.exports.subCatValidation = subCatValidation;
module.exports.categoryValidationOnUpdate = categoryValidationOnUpdate;
module.exports.subCatValidationOnUpdate = subCatValidationOnUpdate;
module.exports.reviewValidation = reviewValidation;
module.exports.questionValidation = questionValidation;
module.exports.storeUpdateValidation = storeUpdateValidation;
