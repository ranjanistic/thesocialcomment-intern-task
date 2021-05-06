const worker = require("../workers/post"),
  { getUserIDFromRequest } = require("../workers/user");

module.exports = {
  post: (req, res, next) => {
    res.send(`
      Authorization token is required for following endpoints (POST)</br>
      > /post/create</br>
        request body = { title:String, content:String, tags:Array (optional) }</br>
      > /post/react</br>
          request body = { postID:String, like:Boolean }</br>
      > /post/respond</br>
          request body = { postID:String, comment:String }</br>
      > /post/all </br>
          request body = { }</br>
      > /post/all/likers </br>
          request body = { }</br>
      > /post/all/dislikers </br>
          request body = { }</br>
      > /post/commented</br>
    request body = { }</br>`);
  },
  create: async (req, res, next) =>
    res.json(
      await worker.createNew({
        ...req.body,
        userID: getUserIDFromRequest(req),
      })
    ),
  react: async (req, res, next) =>
    res.json(
      await worker.react({
        ...req.body,
        userID: getUserIDFromRequest(req),
      })
    ),
  respond: async (req, res, next) =>
    res.json(
      await worker.respond({
        ...req.body,
        userID: getUserIDFromRequest(req),
      })
    ),
  allPosts: async (req, res, next) =>
    res.json(await worker.allPosts(getUserIDFromRequest(req))),
  allPostsWithReaction: async (req, res, next) =>
    res.json(
      await worker.allPostsWithReaction(
        getUserIDFromRequest(req),
        req.params.reaction
      )
    ),
  allCommentedPosts: async (req, res, next) =>
    res.json(await worker.allCommentedPosts(getUserIDFromRequest(req))),
};
