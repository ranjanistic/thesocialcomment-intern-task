const Joi = require("joi"),
  { ObjectId } = require("mongodb"),
  { OBIDCHECK, MALE, FEMALE, OTHERS } = require("./../strings");

const objectIDCheck = (value) => {
  try {
    return ObjectId(value);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  BsonObjectID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
  Newuser: Joi.object({
    _id: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().min(0).max(0).allow(MALE, FEMALE, OTHERS).required(),
    password: Joi.string().min(6).max(50),
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
  }),
  PostReact: Joi.object({
    postID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    userID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    like: Joi.boolean().required(),
  }),
  PostRespond: Joi.object({
    postID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    userID: Joi.custom(objectIDCheck, OBIDCHECK).required(),
    comment: Joi.string().required(),
  }),
};
