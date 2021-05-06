const { SERVERUP, ROOTHTML, NOTFOUND } = require("../string");

module.exports = {
  startUp: (host, port) => {
    console.log(SERVERUP, host, port);
  },
  root: (_, res) => res.send(ROOTHTML),
  notFound: (_, res) => {
    res.status(404);
    res.format({
      json: () => {
        res.json({ error: NOTFOUND });
      },
      default: () => {
        res.type("txt").send(NOTFOUND);
      },
    });
  },
};
