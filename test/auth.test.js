const assert = require("assert"),
  { existingLogin, createNew } = require("../workers/user");

describe("Login test", () => {
  it("Email should be invalid", async () => {
    let res = await existingLogin({
      email: "mockemaimail.com",
      password: "abcdefgh",
    });
    assert.strictEqual(true, res.error.includes("email"));
  });
  it("Password should be invalid", async () => {
    let res = await existingLogin({
      email: "mockemail@gmail.com",
      password: "",
    });
    assert.strictEqual(true, res.error.includes("password"));
  });
});

describe("Signup test", () => {
  it("Name should be there", async () => {
    let res = await createNew({
      email: "mockemai@mail.com",
      password: "abadclkasjdf",
      gender: "O",
    });
    assert.strictEqual(true, res.error.includes("name"));
  });
  it("Email should be invalid", async () => {
    let res = await createNew({
      name: "testing",
      email: "mockemaimail.com",
      password: "abcdefgh",
      gender: "F",
    });
    assert.strictEqual(true, res.error.includes("email"));
  });
  it("Password should be invalid", async () => {
    let res = await createNew({
      name: "testing",
      email: "mockemai@mail.com",
      password: "aba",
      gender: "M",
    });
    assert.strictEqual(true, res.error.includes("password"));
  });
  it("Gender should be there", async () => {
    let res = await createNew({
      name: "testing",
      email: "mockemai@mail.com",
      password: "abadclkasjdf",
    });
    assert.strictEqual(true, res.error.includes("gender"));
  });
});
