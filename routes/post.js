const post = require("express").Router(),
  string  = require("../string"),
  handler = require("../handlers/post");

post.get(string.path.ROOT, handler.post);
post.post(string.path.CREATE, handler.create);
post.post(string.path.REACT, handler.react);
post.post(string.path.RESPOND, handler.respond);
post.post(string.path.ALLPOSTREACT, handler.allPostsWithReaction);
post.post(string.path.ALLPOST, handler.allPosts);
post.post(string.path.ALLPOSTCOMMENT, handler.allCommentedPosts);

module.exports = post;
