const jwt = require("jsonwebtoken"),
  { SESSIONKEY } = require("../config/env"),
  User = require("../workers/user");
const { getUserIDFromRequest } = require("../workers/user");

module.exports = {
  auth: (req, res, next) => {
    res.send("authorization");
  },
  authcheck: (req, res, next) => {
    try {
      if (!getUserIDFromRequest(req)) {
        throw "Invalid";
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({
        error: "Invalid request. Rejected.",
      });
    }
  },
  login: async (req, res, next) => {
    const response = await User.existingLogin(req.body);
    res.json(response);
  },
  signup: async (req, res, next) => {
    const response = await User.createNew(req.body);
    res.json(response);
  },
};
