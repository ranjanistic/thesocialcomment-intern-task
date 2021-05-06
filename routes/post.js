const post = require("express").Router(),
  { path } = require("../string"),
  handler = require("../handlers/post");

post.get(path.ROOT, handler.post);
post.post(path.CREATE, handler.create);
post.post(path.REACT, handler.react);
post.post(path.RESPOND, handler.respond);
post.post(path.ALLPOSTREACT, handler.allPostsWithReaction);
post.post(path.ALLPOST, handler.allPosts);
post.post(path.ALLPOSTCOMMENT, handler.allCommentedPosts);

module.exports = post;
