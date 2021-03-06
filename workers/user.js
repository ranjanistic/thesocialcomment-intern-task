const { ObjectId } = require("mongodb"),
  jwt = require("jsonwebtoken"),
  bycrpt = require("bcrypt"),
  { Newuser, Olduser } = require("../database/models"),
  { Users } = require("../database/database"),
  string = require("../string"),
  { SESSIONKEY } = require("../config/env");

class User {
  /**
   * To create a new user
   * @param user New user info for account creation
   * @returns success/failure response
   */
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

  /**
   * To get authorization token for existing user.
   * @param user Existing user login credentials
   * @returns success/failure response with auth token.
   */
  async existingLogin(user = { email: String, password: String }) {
    const { error, value } = Olduser.validate(user);
    if (error) return { error: error.message, ok: false };
    let doc = await Users().findOne({ email: value.email });
    if (!doc)
      return { error: string.USERNOTFOUND, email: value.email, ok: false };
    const matched = await bycrpt.compare(value.password, doc.password);
    if (!matched) return { error: string.CREDERROR, ok: false };
    const token = jwt.sign({ userID: doc._id }, SESSIONKEY, {
      expiresIn: "24h",
    });
    return { userID: doc._id, token, ok: true };
  }

  /**
   * To fetch info of user by ID.
   * @param {ObjectId} userID The id of user to fetch data.
   * @returns User data
   */
  async findByID(userID) {
    return await Users().findOne({ _id: ObjectId(userID) });
  }

  /**
   * To get the user ID from request, should it contain valid auth token in header (Authorization) or body (token).
   * @param {Express.Request} req The request object of express application
   * @returns UserID if token is valid, null otherwise.
   */
  getUserIDFromRequest(req) {
    let token = null;
    if (req.headers.authorization) {
      token = req.headers.authorization.trim();
    } else if (req.body.token) {
      token = req.body.token.trim();
    } else return null;
    try {
      token = token.includes(" ") ? token.split(" ")[1] : token;
      const decodedToken = jwt.verify(token, SESSIONKEY);
      if (decodedToken.exp < Date.now() / 1000) return null;
      return decodedToken.userID;
    } catch {
      return null;
    }
  }
}

module.exports = new User();
