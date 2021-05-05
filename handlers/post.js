module.exports = {
  post: (req, res, next) => {
    console.log("he");
    res.send("posting");
  },
  create: (req, res, next) => {},
  react: (req, res, next) => {},
  respond: (req, res, next) => {},
};
