const auth = require("express").Router(),
  string = require("../string"),
  handler = require("../handlers/auth");

auth.all(string.path.ROOT, handler.auth);
auth.post(string.path.LOGIN, handler.login);
auth.post(string.path.SIGNUP, handler.signup);

module.exports = auth;
