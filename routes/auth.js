const { Router } = require("express"),
  auth = Router(),
  handler = require("../handlers/auth");

auth.get("/", handler.auth);
auth.post("/login", handler.login);
auth.post("/signup", handler.signup);
auth.get("/logout", handler.logout);

module.exports = auth;