const { ObjectId } = require("mongodb"),
  jwt = require("jsonwebtoken"),
  bycrpt = require("bcrypt"),
  { Newuser, Olduser } = require("../database/models"),
  { Users } = require("../database/database"),
  string = require("../strings"),
  { SESSIONKEY } = require("../config/env");

class User {
  async createNew(
    user = { name: String, email: String, gender: String, password: String }
  ) {
    const { error, value } = Newuser.validate({
      ...user,
      _id: new ObjectId(),
      createdOn: Date(),
    });
    if (error) return { error: error.message, ok: false };
    let doc = await Users().findOne({ email: value.email });
    if (doc) return { error: string.USEREXISTS, email: value.email, ok: false };
    value.password = await bycrpt.hash(value.password, 10);
    doc = await Users().insertOne(value);
    if (!doc.result.ok) return { error: string.DBERROR, ok: false };
    return { userID: value._id, ok: true };
  }

  async existingLogin(user = { email: String, password: String }) {
    const { error, value } = Olduser.validate(user);
    if (error) return { error: error.message, ok: false };
    let doc = await Users().findOne({ email: value.email });
    if (!doc)
      return { error: string.USERNOTFOUND, email: value.email, ok: false };
    const matched = await bycrpt.compare(value.password, doc.password);
    if (!matched) return { error: string.CREDERROR, ok: false };
    const token = jwt.sign({ _id: doc._id }, SESSIONKEY, {
      expiresIn: "24h",
    });
    return { userID: doc._id, token, ok: true };
  }
}

module.exports = new User();
