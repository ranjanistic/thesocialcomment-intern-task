const jwt = require("jsonwebtoken"),
  { SESSIONKEY } = require("../config/env"),
  User = require("../workers/user");

module.exports = {
  auth: (req, res, next) => {
    res.send("authorization");
  },
  authcheck: (req, res, next) => {
    try {
      let token = req.headers.authorization.trim();
      token = token.includes(" ") ? token.split(" ")[1] : token;
      const decodedToken = jwt.verify(token, SESSIONKEY);
      const userId = decodedToken._id;
      console.log(decodedToken);
      if (req.body.userId && req.body.userId !== userId) {
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
