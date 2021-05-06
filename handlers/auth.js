const worker = require("../workers/user"),
  { UNAUTHREQ, AUTHHTML } = require("../string"),
  { getUserIDFromRequest } = require("../workers/user");

module.exports = {
  auth: (_, res) => res.send(AUTHHTML),
  authcheck: (req, res, next) => {
    try {
      if (getUserIDFromRequest(req)) next();
      else throw new Error(UNAUTHREQ);
    } catch (e) {
      res.status(401).json({ error: e.message });
    }
  },
  login: async (req, res) => res.json(await worker.existingLogin(req.body)),
  signup: async (req, res) => res.json(await worker.createNew(req.body)),
};
