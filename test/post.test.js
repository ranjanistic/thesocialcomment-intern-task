const assert = require("assert"),
  { createNew, react, respond } = require("../workers/post"),
  { ObjectId } = require("bson");

describe("Post creation", () => {
  it("User ID should be invalid", async () => {
    let res = await createNew({
      content: "test",
    });
    assert.strictEqual(true, res.error.includes("userID"));
  });
  it("Title should be there", async () => {
    let res = await createNew({
      content: "test",
      userID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("title"));
  });
  it("Content should be there", async () => {
    let res = await createNew({
      title: "test",
      userID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("content"));
  });
});

describe("Reaction test", () => {
  it("User ID should be invalid", async () => {
    let res = await react({
      like: true,
      postID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("userID"));
  });
  it("Post ID should be there", async () => {
    let res = await react({
      like: false,
    });
    assert.strictEqual(true, res.error.includes("postID"));
  });
  it("Like should be there", async () => {
    let res = await react({
      postID: new ObjectId(),
      userID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("like"));
  });
});
describe("Response test", () => {
  it("User ID should be there", async () => {
    let res = await respond({
      comment: "test",
      postID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("userID"));
  });
  it("Post ID should be there", async () => {
    let res = await respond({
      comment: "test",
      userID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("postID"));
  });
  it("Comment should be there", async () => {
    let res = await respond({
      postID: new ObjectId(),
      userID: new ObjectId(),
    });
    assert.strictEqual(true, res.error.includes("comment"));
  });
});
