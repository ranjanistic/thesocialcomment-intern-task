const worker = require("../workers/user"),
  { UNAUTHREQ } = require("../string"),
  { getUserIDFromRequest } = require("../workers/user");

module.exports = {
  auth: (req, res, next) => {
    res.send(`
      Following are the available endpoints (POST):</br></br>
      > /auth/signup</br>
        request body = { name:String, email:String, password:String, gender:[F/M/O]:String }</br>
      > /auth/login</br>
        request body = { email:String, password:String }</br>
        You'll receive a token. Add that to your request Authorization header, or include that in request body as 'token'.
        </br></br>
    `);
  },
  authcheck: (req, res, next) => {
    try {
      if (getUserIDFromRequest(req)) next();
      else throw new Error(UNAUTHREQ);
    } catch (e) {
      res.status(401).json({ error: e.message });
    }
  },
  login: async (req, res, next) => res.json(await worker.existingLogin(req.body)),
  signup: async (req, res, next) => res.json(await worker.createNew(req.body)),
};
