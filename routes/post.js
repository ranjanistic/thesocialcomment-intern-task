const post = require("express").Router(),
  handler = require("../handlers/post");

post.get("/", handler.post);
post.get("/create", handler.create);
post.get("/react", handler.react);
post.get("/respond", handler.respond);

module.exports = post;
