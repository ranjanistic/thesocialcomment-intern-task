const auth = require("express").Router(),
  {path} = require("../string"),
  handler = require("../handlers/auth");

auth.all(path.ROOT, handler.auth);
auth.post(path.LOGIN, handler.login);
auth.post(path.SIGNUP, handler.signup);

module.exports = auth;
