const assert = require("assert"),
  { initDBConnection } = require("../database/database"),
  { existingLogin, createNew } = require("../workers/user");

describe("Login test", () => {
  it("Account should not exist", async () => {
    initDBConnection(async () => {
      let res = await existingLogin({
        email: "mockemail@gmail.com",
        password: "abcdefgh",
      });
      assert.strictEqual(false, res.ok);
    });
  });
  it("Email should be invalid", async () => {
    initDBConnection(async () => {
      let res = await existingLogin({
        email: "mockemaimail.com",
        password: "abcdefgh",
      });
      assert.strictEqual(false, res.ok);
    });
  });
});

describe("Signup test", () => {
  it("Name should be there", async () => {
    initDBConnection(async () => {
      let res = await createNew({
        email: "mockemai@mail.com",
        password: "abadclkasjdf",
      });
      assert.strictEqual(false, res.ok);
    });
  });
  it("Email should be invalid", async () => {
    initDBConnection(async () => {
      let res = await createNew({
        name: "testing",
        email: "mockemaimail.com",
        password: "abcdefgh",
      });
      assert.strictEqual(false, res.ok);
    });
  });
  it("Password should be invalid", async () => {
    initDBConnection(async () => {
      let res = await createNew({
        name: "testing",
        email: "mockemai@mail.com",
        password: "abad",
      });
      assert.strictEqual(false, res.ok);
    });
  });
  it("Gender should be there", async () => {
    initDBConnection(async () => {
      let res = await createNew({
        name: "testing",
        email: "mockemai@mail.com",
        password: "abadclkasjdf",
      });
      assert.strictEqual(false, !res.ok);
      process.exit(0);
    });
  });
});
