const worker = require("../workers/post"),
  { POSTHTML } = require("../string"),
  { getUserIDFromRequest } = require("../workers/user");

module.exports = {
  post: (_, res) => res.send(POSTHTML),
  create: async (req, res) =>
    res.json(
      await worker.createNew({
        ...req.body,
        userID: getUserIDFromRequest(req),
      })
    ),
  react: async (req, res) =>
    res.json(
      await worker.react({
        ...req.body,
        userID: getUserIDFromRequest(req),
      })
    ),
  respond: async (req, res) =>
    res.json(
      await worker.respond({
        ...req.body,
        userID: getUserIDFromRequest(req),
      })
    ),
  allPosts: async (req, res) =>
    res.json(await worker.allPosts(getUserIDFromRequest(req))),
  allPostsWithReaction: async (req, res) =>
    res.json(
      await worker.allPostsWithReaction(
        getUserIDFromRequest(req),
        req.params.reaction
      )
    ),
  allCommentedPosts: async (req, res) =>
    res.json(await worker.allCommentedPosts(getUserIDFromRequest(req))),
};
