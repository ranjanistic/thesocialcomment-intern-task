const express = require("express"),
  server = express(),
  string = require("./string"),
  handler = require("./handlers/server"),
  { authcheck } = require("./handlers/auth"),
  helmet = require("helmet"),
  cors = require("cors"),
  { initDBConnection } = require("./database/database");

server.use(
  helmet(),
  express.json(),
  express.urlencoded({ extended: true }),
  express.raw()
);
server.use(cors());

initDBConnection((error, dbname) => {
  if (error) return console.log(string.DBCONNFAILED);
  console.log(string.DBCONNSUCCESS, dbname);
  server.get(string.path.ROOT, handler.root);
  server.use(string.path.AUTH, require("./routes/auth"));
  server.use(string.path.POST, authcheck, require("./routes/post"));

  server.use(handler.notFound);
  const port = process.env.PORT || 5000 || 80,
    host = "0.0.0.0" || "localhost";

  server.listen(port, host, (_) => handler.startUp(host, port));
});
