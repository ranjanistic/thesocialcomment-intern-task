const auth = require("express").Router(),
  handler = require("../handlers/auth");

auth.all("/", handler.auth);
auth.post("/login", handler.login);
auth.post("/signup", handler.signup);

module.exports = auth;
