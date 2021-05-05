const {
  createNew,
  react,
  respond,
  allPostsWithReaction,
  allCommentedPosts,
} = require("../workers/post");
const { getUserIDFromRequest } = require("../workers/user");

module.exports = {
  post: (req, res, next) => {
    res.send("posting");
  },
  create: async (req, res, next) => {
    let response = await createNew({
      ...req.body,
      userID: getUserIDFromRequest(req),
    });
    return res.json(response);
  },
  react: async (req, res, next) => {
    let response = await react({
      ...req.body,
      userID: getUserIDFromRequest(req),
    });
    return res.json(response);
  },
  respond: async (req, res, next) => {
    let response = await respond({
      ...req.body,
      userID: getUserIDFromRequest(req),
    });
    return res.json(response);
  },
  allPostsWithReaction: async (req, res, next) => {
    let response = await allPostsWithReaction(
      getUserIDFromRequest(req),
      req.params.reaction
    );
    return res.json(response);
  },
  allCommentedPosts: async (req, res, next) => {
    let response = await allCommentedPosts(getUserIDFromRequest(req));
    return res.json(response);
  },
};
