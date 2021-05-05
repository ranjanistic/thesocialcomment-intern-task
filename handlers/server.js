module.exports = {
  root: (req, res) => {
    res.send("root");
  },
  notFound: (req, res) => {
    res.status(404);
    res.format({
      json: () => {
        res.json({ status: 404, error: "Not found" });
      },
      default: () => {
        res.type("txt").send("404: Not found");
      },
    });
  },
};
