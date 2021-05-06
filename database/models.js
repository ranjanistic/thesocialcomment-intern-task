const Joi = require("joi"),
  { ObjectId } = require("mongodb"),
  {
    OBIDCHECK,
    GENDERCHECK,
    MALE,
    FEMALE,
    OTHERS,
    INVALIDOBID,
    INVALIDGENDER,
  } = require("../string"),
  objectIDCheck = (value) => {
    try {
      return ObjectId(value);
    } catch (e) {
      throw new Error(INVALIDOBID);
    }
  };

module.exports = {
  BsonObjectID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
  Newuser: Joi.object({
    _id: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    gender: Joi.custom((value) => {
      if ([MALE, FEMALE, OTHERS].includes(String(value).toUpperCase()))
        return String(value).toUpperCase();
      throw new Error(INVALIDGENDER);
    }, GENDERCHECK).required(),
    password: Joi.string().min(6).max(50).required(),
    createdOn: Joi.date().required(),
  }),
  Olduser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
  }),
  Newpost: Joi.object({
    _id: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    userID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    title: Joi.string().min(2).max(2000).required(),
    content: Joi.string().min(1).max(20000).required(),
    tags: Joi.array().min(0).max(20).items(Joi.string()),
    createdOn: Joi.date().required(),
    reacts: Joi.array().min(0).required(),
    responses: Joi.array().min(0).required(),
    token: Joi.string(),
  }),
  PostReact: Joi.object({
    postID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    userID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    like: Joi.boolean().required(),
    token: Joi.string(),
  }),
  PostRespond: Joi.object({
    postID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    userID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    comment: Joi.string().required(),
    token: Joi.string(),
  }),
};
