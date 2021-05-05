const post = require("express").Router(),
  handler = require("../handlers/post");

post.get("/", handler.post);
post.post("/create", handler.create);
post.post("/react", handler.react);
post.post("/respond", handler.respond);

module.exports = post;
