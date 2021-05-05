const express = require("express"),
  server = express(),
  string = require("./strings"),
  handler = require("./handlers/server"),
  { authcheck } = require("./handlers/auth"),
  helmet = require("helmet"),
  { initDBConnection } = require("./database/database");

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

initDBConnection((error, dbname) => {
  if (error) return console.log(string.DBCONNFAILED);
  console.log(string.DBCONNSUCCESS, dbname);

  server.get("/", handler.root);

  server.use("/auth", require("./routes/auth"));
  server.use("/post", authcheck, require("./routes/post"));

  server.use(handler.notFound);
  const port = process.env.PORT || 5000 || 80,
    host = "0.0.0.0" || "localhost";

  server.listen(port, host, (_) => handler.startUp(host, port));
});
