const { ObjectId } = require("mongodb"),
  string = require("../string"),
  { Posts } = require("../database/database"),
  { INVALIDPOST } = require("../string"),
  {
    Newpost,
    PostReact,
    PostRespond,
    BsonObjectID,
  } = require("../database/models"),
  User = require("./user");

class Post {
  likers = "likers";
  dislikers = "dislikers";

  /**
   * To create a new post
   * @param post Details of the new post
   * @returns success/failure response
   */
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

  /**
   * To react (like/dislike) a post.
   * @param post Post details to react to.
   * @returns success/failure response
   */
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

  /**
   * To respond (comment) on a post.
   * @param post Post details to respond to.
   * @returns success/failure response
   */
  async respond(post = { postID: String, userID: String, comment: String }) {
    const { error, value } = PostRespond.validate(post);
    if (error) return { error: error.message, ok: false };
    let existingPost = await Posts().findOne({ _id: value.postID });
    if (!existingPost) return { error: INVALIDPOST, ok: false };
    const doc = await Posts().findOneAndUpdate(
      { _id: value.postID },
      {
        $push: {
          responses: {
            userID: value.userID,
            comment: value.comment,
          },
        },
      }
    );
    return { ok: doc.ok === 1, postID: value.postID };
  }

  /**
   * Get all posts of the user
   * @param {ObjectId} userID The user requesting response.
   * @returns All posts of the user with reactions and responses of people with names.
   */
  async allPosts(userID) {
    const { error, value } = BsonObjectID.validate(userID);
    if (error) return { error: error.message, ok: false };
    let posts = await Posts().find({ userID: value }).toArray();
    posts = await Promise.all(
      posts.map(async (post) => {
        const reacts = await Promise.all(
          post.reacts.map(async (react) => {
            const user = await User.findByID(react.userID);
            return {
              userID: user ? user._id : null,
              name: user ? user.name : null,
              like: react.like,
            };
          })
        );
        const responses = await Promise.all(
          post.responses.map(async (response) => {
            const user = await User.findByID(response.userID);
            return {
              userID: user ? user._id : null,
              name: user ? user.name : null,
              comment: response.comment,
            };
          })
        );
        return {
          postID: post._id,
          title: post.title,
          content: post.content,
          tags: post.tags,
          reacts,
          responses,
        };
      })
    );
    return { ok: true, posts };
  }

  /**
   * Get all posts of the user with reactors as per reaction category.
   * @param {ObjectId} userID The user requesting response.
   * @param reaction The reaction category of people (likers/dislikers).
   * @returns All posts of the user with reactors.
   */
  async allPostsWithReaction(userID, reaction = this.likers) {
    const { error, value } = BsonObjectID.validate(userID);
    if (error) return { error: error.message, ok: false };
    let { posts } = await this.allPosts(value);
    posts = posts.map((post) => {
      let reacts = post.reacts.map((react) => {
        if (reaction === this.dislikers) {
          if (!react.like) return react;
        } else {
          if (react.like) return react;
        }
        return null;
      });
      reacts = reacts.filter((react) => react !== null);
      const finalPost = {
        ...post,
        [[this.likers, this.dislikers].includes(reaction)
          ? reaction
          : this.likers]: reacts,
      };
      delete finalPost.reacts;
      delete finalPost.responses;
      return finalPost;
    });

    return { ok: true, posts };
  }

  /**
   * Get all posts on which the user has commented.
   * @param {ObjectId} userID The user requesting response
   * @returns success/failure response
   */
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
