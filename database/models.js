const Joi = require("joi"),
  { ObjectId } = require("mongodb");

module.exports = {
  Newuser: Joi.object({
    _id: Joi.custom((value) => {
      try {
        return ObjectId(value);
      } catch (e) {
        throw e;
      }
    }, "ObjectID validation").required(),
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().min(0).max(0).allow("M", "F", "O").required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,50}$"))
      .required(),
    createdOn: Joi.date().required(),
  }),
  Olduser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
  }),
};
