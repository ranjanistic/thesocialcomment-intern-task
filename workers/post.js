const { ObjectId } = require("mongodb"),
  string = require("../strings"),
  { Posts } = require("../database/database"),
  { INVALIDPOST } = require("../strings"),
  {
    Newpost,
    PostReact,
    PostRespond,
    BsonObjectID,
  } = require("../database/models"),
  User = require("./user");

class Post {
  async createNew(
    post = { title: String, content: String, tags: Array, userID: String }
  ) {
    const { error, value } = Newpost.validate({
      ...post,
      _id: new ObjectId(),
      createdOn: Date(),
      reacts: [],
      responses: [],
    });
    if (error) return { error: error.message, ok: false };
    let doc = await Posts().insertOne(value);
    if (!doc.result.ok) return { error: string.DBERROR };
    return { postID: value._id, ok: true };
  }

  async react(post = { postID: String, userID: String, like: Boolean }) {
    const { error, value } = PostReact.validate(post);
    if (error) return { error: error.message, ok: false };
    let existingPost = await Posts().findOne({ _id: value.postID });
    if (!existingPost) return { error: INVALIDPOST, ok: false };
    let filter = { _id: value.postID },
      update = {
        $push: {
          reacts: {
            userID: value.userID,
            like: value.like,
          },
        },
      };
    if (
      existingPost.reacts.some(
        (react) => String(react.userID) === String(value.userID)
      )
    ) {
      filter = {
        _id: value.postID,
        reacts: { $elemMatch: { userID: value.userID } },
      };
      update = {
        $set: {
          "reacts.$.like": value.like,
        },
      };
    }
    const doc = await Posts().findOneAndUpdate(filter, update);
    return { ok: doc.ok === 1, postID: value.postID };
  }

  async respond(post = { postID: String, userID: String, comment: String }) {
    const { error, value } = PostRespond.validate(post);
    if (error) return { error: error.message, ok: false };
    let existingPost = await Posts().findOne({ _id: value.postID });
    if (!existingPost) return { error: INVALIDPOST, ok: false };
    let filter = { _id: value.postID },
      update = {
        $push: {
          responses: {
            userID: value.userID,
            comment: value.comment,
          },
        },
      };
    const doc = await Posts().findOneAndUpdate(filter, update);
    return { ok: doc.ok === 1, postID: value.postID };
  }

  async allPostsWithReaction(userID, reaction = "likers") {
    const { error, value } = BsonObjectID.validate(userID);
    if (error) return { error: error.message, ok: false };

    let posts = await Posts().find({ userID: value }).toArray();
    posts = await Promise.all(
      posts.map(async (post) => {
        let reactors = [];
        await Promise.all(
          post.reacts.map(async (react) => {
            if (reaction === "dislikers") {
              if (!react.like) {
                const user = await User.findByID(react.userID);
                reactors.push({
                  userID: user._id,
                  name: user.name,
                });
              }
            } else {
              if (react.like) {
                const user = await User.findByID(react.userID);
                reactors.push({
                  userID: user._id,
                  name: user.name,
                });
              }
            }
          })
        );
        return {
          postID: post._id,
          title: post.title,
          content: post.content,
          tags: post.tags,
          [["likers", "dislikers"].includes(reaction)
            ? reaction
            : "likers"]: reactors,
        };
      })
    );
    return { ok: true, posts };
  }

  async allCommentedPosts(userID) {
    const { error, value } = BsonObjectID.validate(userID);
    if (error) return { error: error.message, ok: false };
    let posts = await Posts()
      .find({ responses: { $elemMatch: { userID: value } } })
      .toArray();
    posts = posts.map((post) => {
      let comments = [];
      post.responses
        .filter((response) => String(response.userID) === String(value))
        .forEach((resp) => comments.push(resp.comment));
      return {
        postID: post._id,
        title: post.title,
        comments,
      };
    });
    return { ok: true, posts };
  }
}

module.exports = new Post();
